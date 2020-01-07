import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup'
import './stylesheets/dashboard.css';
import logo from './images/dbs_logo.svg';
import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';



const testTransaction = [{
  type: "DEBIT",
  amount: "11.69",
  date: "2020-01-01 08:40",
  tag: "F&B",
  reference: "CRAZY SPICY THAI FOOD",
}];

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="/"><img src={logo} alt="DBS Logo"></img></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#">Account Overview</Nav.Link>
            <Nav.Link href="#">Transaction History</Nav.Link>
            <Nav.Link href="#"><i className="far fa-envelope"></i> Messages</Nav.Link>
          </Nav>
        </Navbar>

        <Container>
          <Row className="top-row">
            <Col>
              <Card>
                <Card.Header>Account Overview</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header>Recent Transactions</Card.Header>
                <ListGroup variant="flush">
                  {testTransaction.map(transaction => {
                    return (
                      <ListGroup.Item class="transaction" variant='danger'>

                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={transaction.reference}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="textPrimary"
                                >
                                  {`$${transaction.amount}`}
                                </Typography>
                                {` — ${transaction.date}`}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header>Statistics</Card.Header>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
