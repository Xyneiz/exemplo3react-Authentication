import AppNavbar from './AppNavbar';
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import BackendService from '../services/BackendService';
import { Alert } from "react-bootstrap"

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      content: "",
      error: ""
    }
  }

  componentDidMount() {
    BackendService.getUserBoard()
      .then( response => {
        this.setState({content: response.data})
        console.log(this.state.content);
      } , error => {
        console.log(error);
        this.setState({
          error: error.toString()
        }); 
      });
  }

  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
            {
              this.state.content ? (
                <div style={{marginTop: "20px"}}>
                  <Alert variant="info">
                    <h2>{this.state.content.user.firstname}</h2>
                    <h3>{this.state.content.user.email}</h3>
                  </Alert>
                </div>
              ) : (
                <div style={{marginTop: "20px"}}>
                  <Alert variant="danger">
                    {this.state.error}
                  </Alert>
                </div>
              )
            }
        </Container>
      </div>
    );
  }
}

export default UserPage;