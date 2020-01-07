import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './images/dbs_logo.svg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import './stylesheets/history.css';
import axios from 'axios';

const testTransaction = [
    {
      type: "DEBIT",
      amount: "11.69",
      date: "2020-01-01 08:40",
      tag: "F&B",
      reference: "CRAZY SPICY THAI FOOD",
    },
    {
      type: "CREDIT",
      amount: "11.69",
      date: "2020-01-01 08:40",
      tag: "F&B",
      reference: "TEST CREDIT 1",
    },
    {
      type: "DEBIT",
      amount: "11.69",
      date: "2020-01-01 08:40",
      tag: "F&B",
      reference: "TEST DEBIT 2",
    },
    {
      type: "DEBIT",
      amount: "11.69",
      date: "2020-01-01 08:40",
      tag: "F&B",
      reference: "TEST DEBIT 3",
    },
    {
      type: "CREDIT",
      amount: "11.69",
      date: "2020-01-01 08:40",
      tag: "F&B",
      reference: "TEST CREDIT 2",
    },
];

class HistoryPage extends React.Component {
    state = { userDetails: [],
        trans: [],
        accounts: []
    };

    componentDidMount() {
        axios.get("http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/transactions/79?from=01-01-2018&to=01-30-2020",
              {
                headers: { 'Identity': 'T52' , 'Token': '2ba84203-ac56-468c-b8eb-be3c9bed8b84'}
              }).then(res => this.setState({ trans: res.data.reverse() }))
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

                <Container className="table">
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col xs={6}>Transaction</Col>
                                <Col>Amount</Col>
                                <Col>Date</Col>
                            </Row>
                        </Card.Header>
                        <ListGroup>
                            {this.state.trans.map(transaction => {
                                var stringVariables = transaction.referenceNumber.split(' ');
                                stringVariables.shift();
                                var string = '';
                                stringVariables.forEach(element => {
                                  string += element + ' ';
                                });

                                let timeArray = transaction.date.split('T');
                                let date = timeArray[0] + ' ' + timeArray[1].split('.')[0];

                                return (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={6}>{string}</Col>
                                            <Col>{`${transaction.type === 'DEBIT' ? '-' : ''}${transaction.amount}`}</Col>
                                            <Col>{date}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    </Card>
                    
                </Container>
            </div>
        );
    }
}

export default HistoryPage;