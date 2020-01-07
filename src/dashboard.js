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
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const testAccount = {
  availableBalance: "32784.1",
  currency: "SGD",
  displayName: "POSB SAVINGS ACCOUNT",
  accountNumber: "44284125",
  accountType: "SAVINGS",
};

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

const recommendations = [
  {
    link: 'https://www.dbs.com.sg/personal/deposits/bank-with-ease/dbs-digi-bank-travel-mode?pid=sg-dbs-pweb-bank-heroblock-bank-travemode-btnlearnmore',
    
  },
];

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
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={testAccount.displayName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {`${testAccount.currency} ${testAccount.availableBalance}`}
                        </Typography>
                        {` — ${testAccount.accountType} ACCOUNT`}
                      </React.Fragment>
                    }
                  />
                  </ListItem>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header>Recent Transactions</Card.Header>
                <ListGroup variant="flush">
                  {testTransaction.map(transaction => {
                    return (
                      <ListGroup.Item className="list-item" variant={transaction.type === 'DEBIT' ? 'danger' : 'success'}>
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

          <Row className="top-row">
            <Col>
              <Card>
                <Card.Header>Accounts & Cards</Card.Header>
                <ListGroup variant="flush">
                  {testTransaction.map(transaction => {
                    return (
                      <ListGroup.Item className="list-item" action>
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
              <Card.Header>Investments & Insurance</Card.Header>
                <ListGroup variant="flush">
                  {testTransaction.map(item => {
                    return (
                      <ListGroup.Item className="list-item" action href={item.link} >
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
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
