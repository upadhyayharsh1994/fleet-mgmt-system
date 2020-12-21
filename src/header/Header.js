import React from "react";
import {Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


export class Header extends React.Component
{
    render(){
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Sitetracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/">Add Bus</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}