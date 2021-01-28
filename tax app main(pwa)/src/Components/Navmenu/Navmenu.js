import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/sgv.png'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import './Navmenu.css'

export default function NavMenu() {
  return (
    <Navbar className="color-nav" collapseOnSelect expand="lg" variant="dark">
      <Navbar.Brand href="/">
        <img alt="sgv" width="80" height="60" src={logo} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>

          <NavDropdown title="Publications" id="collasible-nav-dropdown">
            <NavDropdown.Item href="http://www.sgv.ph/news-publications/c-suites/">
              C-Suites
            </NavDropdown.Item>
            <NavDropdown.Item href="https://www.ey.com/en_ph/sgv-tax-bulletin">
              SGV tax Bulletins
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
