import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './images/dbs_logo.svg';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ListGroup from 'react-bootstrap/ListGroup';
import './stylesheets/user.css';

const user = {
    customerId: "1",
    gender: "Male",
    firstName: "Ze Yang",
    lastName: "Lim",
    lastLogIn: "2019-01-27 00:00",
    dateOfBirth: "2000-02-01",
    riskLevel: "Medium",
    unreadMessages: 2,
  }

class UserPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="https://www.dbs.com.sg/personal/default.page" target="_blank"><img src={logo} alt="DBS Logo"></img></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/app"><i class="fas fa-chart-line"></i> Dashboard</Nav.Link>
                        <Nav.Link href="#"><i className="fas fa-user"></i> Account Overview</Nav.Link>
                        <Nav.Link href="#"><i className="far fa-list-alt"></i> Transaction History</Nav.Link>
                        <Nav.Link href="#"><i className="far fa-envelope"></i> Messages</Nav.Link>
                    </Nav>
                </Navbar>

                <Container>
                    <Jumbotron className="user-page">
                        <h1>User Profile</h1>
                        <ListGroup variant="flush">
                            <ListGroup.Item>{`First Name: ${user.firstName}`}</ListGroup.Item>
                            <ListGroup.Item>{`Last Name: ${user.lastName}`}</ListGroup.Item>
                            <ListGroup.Item>{`Date of Birth: ${user.dateOfBirth}`}</ListGroup.Item>
                            <ListGroup.Item>{`Gender: ${user.gender}`}</ListGroup.Item>
                        </ListGroup>
                    </Jumbotron>
                </Container>
            </div>
        );
    }
}

export default UserPage;