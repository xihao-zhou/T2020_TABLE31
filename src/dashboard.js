import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup'
import './stylesheets/dashboard.css';
import logo from './images/dbs_logo.svg';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Jumbotron from 'react-bootstrap/Jumbotron';
import axios from 'axios';

const testAccount = {
  availableBalance: "3,2784.1",
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

const accountAndCardRecommendations = [
  {
    link: 'https://www.dbs.com.sg/personal/deposits/bank-with-ease/dbs-digi-bank-travel-mode?pid=sg-dbs-pweb-bank-heroblock-bank-travemode-btnlearnmore',
    name: 'Travel Mode',
    description: 'Switch it on and forget about travel anxiety',
  },
  {
    link: 'https://www.dbs.com.sg/personal/travel-marketplace/this-is-the-way-we-travel?pid=sg-dbs-pweb-bank-heroblock-bank-this-is-the-way-we-travel-btnlearnmore',
    name: 'Multi-currency DBS Visa Debit Card',
    description: 'The only travel wallet with up to 3.25% cashback worldwide in 150 currencies',
  }
];

const investmentsAndInsuranceRecommendations = [
  {
    link: 'https://www.dbs.com.sg/personal/investments/other-investments/invest-saver',
    name: 'DBS Invest-Saver',
    description: 'Invest in Exchange Traded Funds or Unit Trusts from S$100 a month, on a repeat mode',
  },
  {
    link: 'https://www.dbs.com.sg/personal/insurance/travel/travellershield-plus',
    name: 'TravellerShield Plus',
    description: 'Now with Pre-Existing Medical Condition Benefit so you can enjoy holidays 100%',
  }
];

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

am4core.useTheme(am4themes_animated);

class Dashboard extends React.Component {

state = { userDetails: [],
          trans: [],
          accounts: []
          }

  componentDidMount() {

    axios.get("http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/2/details",
              {
                headers: { 'Identity': 'T52' , 'Token': '2ba84203-ac56-468c-b8eb-be3c9bed8b84'}
              }).then(res => this.setState({ userDetails: res.data }))
              .catch(err => console.log(err));

    axios.get("http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/2",
              {
                headers: { 'Identity': 'T52' , 'Token': '2ba84203-ac56-468c-b8eb-be3c9bed8b84'}
              }).then(res => this.setState({ accounts: res.data }))
              .catch(err => console.log(err));

    axios.get("http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/transactions/79?from=01-01-2018&to=01-30-2020",
              {
                headers: { 'Identity': 'T52' , 'Token': '2ba84203-ac56-468c-b8eb-be3c9bed8b84'}
              }).then(res => this.setState({ trans: res.data }))
              .catch(err => console.log(err));

    let chart = am4core.create("chartdiv", am4charts.PieChart);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "amount";
    pieSeries.dataFields.category = "category";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [
        {
          "property": "cursor",
          "value": "pointer"
        }
      ];

    // pieSeries.alignLabels = false;
    // pieSeries.labels.template.bent = true;
    // pieSeries.labels.template.radius = 3;
    // pieSeries.labels.template.padding(0,0,0,0);
    pieSeries.labels.template.hidden = true;

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    let shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = [{
      "category": "LEISURE",
      "amount": 501.9
    },{
      "category": "F&B",
      "amount": 165.8
    }, {
      "category": "ATM",
      "amount": 139.9
    }, {
      "category": "TRANSFER",
      "amount": 128.3
    }, {
      "category": "TRANSPORT",
      "amount": 99
    }];
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
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

        <Jumbotron>
          <h1>{`Welcome, ${ this.state.userDetails.lastName + " " + this.state.userDetails.firstName }!`}</h1>
          <p>{`You last logged in at ${ this.state.userDetails.lastLogIn }.`}</p>
          <p>{`You have ${user.unreadMessages} unread messages.`}</p>
        </Jumbotron>

        <Container>
          <Row className="dashboard-row">
            <Col>
              <Card>
                <Card.Header>Account Overview</Card.Header>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary= { testAccount.displayName }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {`${testAccount.currency} ${testAccount.availableBalance}`}
                        </Typography>
                        {` — ${ testAccount.accountType } ACCOUNT`}
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
                <Card.Header>Spending Statistics (Past Month)</Card.Header>
                <div id="chartdiv" style={{ width: "400px", height: "400px" }}></div>
              </Card>
            </Col>
          </Row>

          <Row className="dashboard-row">
            <Col>
              <Card>
                <Card.Header>Accounts & Cards</Card.Header>
                <ListGroup variant="flush">
                  {accountAndCardRecommendations.map(recommendation => {
                    return (
                      <ListGroup.Item className="list-item" action href={recommendation.link} target="_blank">
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={recommendation.name}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="textPrimary"
                                >
                                  {recommendation.description}
                                </Typography>
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
                  {investmentsAndInsuranceRecommendations.map(recommendation => {
                    return (
                      <ListGroup.Item className="list-item" action href={recommendation.link} target="_blank">
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={recommendation.name}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="textPrimary"
                                >
                                  {recommendation.description}
                                </Typography>
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
