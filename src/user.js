import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './images/dbs_logo.svg';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ListGroup from 'react-bootstrap/ListGroup';
import './stylesheets/user.css';
import axios from 'axios';

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
    state = { userDetails: [] }

componentDidMount() {

  axios.get("http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/2/details",
            {
              headers: { 'Identity': 'T52' , 'Token': '2ba84203-ac56-468c-b8eb-be3c9bed8b84'}
            }).then(res => this.setState({ userDetails: res.data }))
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="https://www.dbs.com.sg/personal/default.page" target="_blank"><img src={logo} alt="DBS Logo"></img></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/app"><i class="fas fa-chart-line"></i> Dashboard</Nav.Link>
                        <Nav.Link href="/app/user"><i className="fas fa-user"></i> Account Overview</Nav.Link>
                        <Nav.Link href="/app/history"><i className="far fa-list-alt"></i> Transaction History</Nav.Link>
                        <Nav.Link href="#"><i className="far fa-envelope"></i> Messages</Nav.Link>
                    </Nav>
                </Navbar>

                <Container>
                    <Jumbotron className="user-page">
                        <h1>User Profile</h1>
                        <ListGroup variant="flush">
                            <ListGroup.Item>{`First Name: ${this.state.userDetails.firstName}`}</ListGroup.Item>
                            <ListGroup.Item>{`Last Name: ${this.state.userDetails.lastName}`}</ListGroup.Item>
                            <ListGroup.Item>{`Date of Birth: ${this.state.userDetails.dateOfBirth}`}</ListGroup.Item>
                            <ListGroup.Item>{`Gender: ${this.state.userDetails.gender}`}</ListGroup.Item>
                        </ListGroup>
                    </Jumbotron>
                </Container>
            </div>
        );
    }
}

export default UserPage;