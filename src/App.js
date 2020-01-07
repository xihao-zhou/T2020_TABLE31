import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#">Account Overview</Nav.Link>
          <Nav.Link href="#">Transaction History</Nav.Link>
          <Nav.Link href="#"><i className="far fa-envelope"></i> Messages</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default App;
