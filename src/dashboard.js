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
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

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

am4core.useTheme(am4themes_animated);

class Dashboard extends React.Component {

  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.PieChart);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";

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
      "country": "Lithuania",
      "litres": 501.9
    },{
      "country": "Germany",
      "litres": 165.8
    }, {
      "country": "Australia",
      "litres": 139.9
    }, {
      "country": "Austria",
      "litres": 128.3
    }, {
      "country": "UK",
      "litres": 99
    }, {
      "country": "Belgium",
      "litres": 60
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
                <Card.Header>Spending Statistics</Card.Header>
                <div id="chartdiv" style={{ width: "400px", height: "400px" }}></div>
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
