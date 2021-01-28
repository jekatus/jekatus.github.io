import React, { Component } from "react";
import _ from "lodash";
import { Data } from "../../Data";

export default class Reminder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: Data,
		};
	}

	getData = (fulldate, monthday) => {
		let dateMatched = false;

		let details = this.state.data.map((data) => {
			let isMatch = data.date.includes(fulldate);

			let full_details_list = [];
			let reminder_list = [];

			if (isMatch) {
				dateMatched = true;
				let content_length = data.content.length;
				for (let ct = 0; ct < content_length; ct++) {
					let reminders = [];
					let title = _.get(data.content[ct], "title");
					for (let cl of _.get(data.content[ct], "listed")) {
						reminders.push(
							<li
								style={{ paddingTop: "5px" }}
								key={ct + cl}
								className="li-arrow"
							>
								{cl}
							</li>
						);
					}
					reminder_list.push(
						<div style={{ textAlign: "left" }} key={ct}>
							<b>{title}</b>
							<br />
							<br />
							<ul style={{ textAlign: "left" }}>{reminders}</ul>
						</div>
					);
				}
				full_details_list.push(<div key={data}>{reminder_list}</div>);
			}

			return full_details_list;
		});
		return dateMatched ? (
			details
		) : (
			<p style={{ textAlign: "center" }}>No events for {monthday}</p>
		);
	};

	render() {
		let { thedate, month_day } = this.props;
		return (
			<div>
				<div className="event-completedate">{thedate}</div>
				<div
					className="event-card"
					style={{
						borderLeft: "11px",
						border: "solid",
						color: "rgb(255,255,255)",
					}}
				>
					<div className="event-name">{this.getData(thedate, month_day)}</div>
				</div>
			</div>
		);
	}
}
