import React, { Component } from "react";
import moment from "moment";
import _ from "lodash";
import "./calendar.css";
import Reminder from "./reminders";
import { Data } from "../../Data";

export default class Calendar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: Data,
			dateContext: moment(),
			today: moment(),
			showMonthPopup: false,
			showYearPopup: false,

			selectNo: moment().format("D"),
			selectMonth: moment().format("MMMM"),
			FullDateSelected: moment().format("MMMM D YYYY"),
		};
	}

	weekdays = moment.weekdays(); //Sunday, Monday, Tuesday etc...
	weekdaysShort = moment.weekdaysShort(); //Sun, Mon, Tues, etc..
	months = moment.months(); // January, February, March etc...

	year = () => {
		return this.state.dateContext.format("Y");
	};
	month = () => {
		return this.state.dateContext.format("MMMM");
	};
	daysInMonth = () => {
		return this.state.dateContext.daysInMonth();
	};

	currentDate = () => {
		return this.state.dateContext.get("date");
	};
	currentDay = () => {
		return this.state.dateContext.format("D");
	};

	// get the first day of the month which is blank
	firstDayofMonth = () => {
		let dateContext = this.state.dateContext;
		let firstDay = moment(dateContext).startOf("month").format("d"); // Day of week 0..1..2
		return firstDay;
	};

	// set the month that appears on screen based on the month selected
	setMonth = (month) => {
		let monthNo = this.months.indexOf(month);
		let dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment().set("month", monthNo);
		this.setState({
			dateContext,
			selectNo: dateContext.startOf("month").format("D"),
			selectMonth: dateContext.startOf("month").format("MMMM"),
			FullDateSelected: `${month} 1 ${this.year()}`,
		});
	};

	//this function is not in use
	nextMonth = () => {
		let dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment(dateContext).add(1, "month");
		this.setState({ dateContext });
		this.props.nextMonth && this.props.nextMonth();
	};

	//this function is not in uaw
	prevMonth = () => {
		let dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment(dateContext).subtract(1, "month");
		this.setState({ dateContext });
		this.props.prevMonth && this.props.prevMonth();
	};

	showYearEditor = () => {
		this.setState({
			showYearNav: true,
		});
	};

	setYear = (year) => {
		let dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment(dateContext).set("year", year);
		this.setState({
			dateContext: dateContext,
		});
	};
	onYearChange = (e) => {
		this.setYear(e.target.value);
		this.props.onYearChange && this.props.onYearChange(e, e.target.value);
	};

	onKeyUpYear = (e) => {
		if (e.which === 13 || e.which === 27) {
			this.setYear(e.target.value);
			this.setState({
				showYearNav: false,
			});
		}
	};

	YearNav = () => {
		return this.state.showYearNav ? (
			<input
				defaultValue={this.year()}
				className="editor-year"
				ref={(yearInput) => {
					this.yearInput = yearInput;
				}}
				onKeyUp={(e) => this.onKeyUpYear(e)}
				onChange={(e) => this.onYearChange(e)}
				type="number"
				placeholder="year"
			/>
		) : (
			<span
				className="label-year"
				onDoubleClick={(e) => {
					this.showYearEditor();
				}}
			>
				{this.year()}
			</span>
		);
	};

	MonthNav = () => {
		return (
			<span
				className="label-month"
				onClick={(e) => {
					this.onChangeMonth(e, this.month());
				}}
			>
				{this.month()}
				{this.state.showMonthPopup && <this.SelectList data={this.months} />}
			</span>
		);
	};

	onDayClick = (e, day) => {
		this.setState({
			selectNo: day.toString(),
			FullDateSelected: `${this.month()} ${day} ${this.year()}`,
		});
		
		this.props.onDayClick && this.props.onDayClick(e, day);
	};

	Date_Storage = () => {
		let length = this.state.data.length;
		let date_storage = [];

		for (let n = 0; n < length; n++) {
			let date = _.get(this.state.data[n], "date");
			date_storage.push(date);
		}
		return date_storage;
	};

	render() {
		let weekdays = this.weekdaysShort.map((day) => {
			return (
				<td key={day} className="day">
					{day}
				</td>
			);
		});

		let blanks = [];
		for (let i = 0; i < this.firstDayofMonth(); i++)
			blanks.push(
				<td key={i * 1000} className="table-date">
					{""}
				</td>
			);

		let daysInMonth = [];
		for (let d = 1; d <= this.daysInMonth(); d++) {
			let isEvent = this.Date_Storage().includes(
				`${this.month()} ${d.toString()} ${this.year()}`
			);

			let className =
				d.toString() === this.state.selectNo
					? "table-date active-date"
					: `table-date ${isEvent ? "table-date-with-event" : ""}`;

			daysInMonth.push(
				<td
					key={d}
					onClick={(e) => {
						this.onDayClick(e, d);
					}}
					className={`${className}`}
				>
					<span>{d}</span>
				</td>
			);
		}

		let totalSlots = [...blanks, ...daysInMonth];
		let rows = [];
		let cells = [];

		totalSlots.forEach((row, i) => {
			if (i % 7 !== 0) {
				cells.push(row);
			} else {
				let insertRow = cells.slice();
				rows.push(insertRow);
				cells = [];
				cells.push(row);
			}
			if (i === totalSlots.length - 1) {
				let insertRow = cells.slice();
				rows.push(insertRow);
			}
		});

		let trElements = rows.map((d, i) => {
			return <tr key={i * 100}>{d}</tr>;
		});

		let tdMonths = this.months.map((month) => {
			return (
				<td
					onClick={(e) => this.setMonth(month)}
					className={
						month === this.state.selectMonth ? "month active-month " : "month"
					}
					key={month}
				>
					{month.substring(0, 3)}
				</td>
			);
		});

		return (
			<React.Fragment>
				<div className="content ">
					<div className="calendar-container">
						<div className="calendar">
							<div className="year-header">
								<span>{this.year()}</span>
								<table className="months-table">
									<tbody>
										<tr>{tdMonths}</tr>
									</tbody>
								</table>
							</div>
							<br />
							<br />
							<table className="dates-table">
								<tbody className="tbody">
									<tr>{weekdays}</tr>
									{trElements}
								</tbody>
							</table>
						</div>
					</div>

					{/* Reminders Container */}
					{/* {console.log(this.state.FullDateSelected)} */}
					<div className="events-container">
						<Reminder
							thedate={this.state.FullDateSelected}
							month_day={`${this.state.FullDateSelected.substring(0, 3)} ${
								this.state.selectNo
							}.`}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
