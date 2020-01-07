import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './stylesheets/dashboard.css';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="/"><img src="../public/images/dbs_logo.svg" alt="DBS Logo"></img> DBS</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#">Account Overview</Nav.Link>
            <Nav.Link href="#">Transaction History</Nav.Link>
            <Nav.Link href="#"><i className="far fa-envelope"></i> Messages</Nav.Link>
          </Nav>
        </Navbar>
  
        <div className="row top-row">
          <div className="col card">
            <Card>
              <Card.Header>Account Overview</Card.Header>
            </Card>
          </div>
          <div className="col">
            <Card style={{ width: '100%' }}>
              <Card.Header>Account Overview</Card.Header>
            </Card>
          </div>
          <div className="col">
            <Card style={{ width: '100%' }}>
              <Card.Header>Account Overview</Card.Header>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
