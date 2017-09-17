import React, {Component} from "react";
import "./Header.css"
import {connect} from "react-redux";
import axios from 'axios';
import FormGroup from "react-bootstrap/es/FormGroup";
import Col from "react-bootstrap/es/Col";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/es/Button";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import Form from "react-bootstrap/es/Form";
import URLConstants from "../Constants/URLConstants";
import authenticationActions from "../Actions/authenticationActions";

class Header extends Component {

    handleButtonClick() {
        let clientId = 'cb79f22e-a0af-4ffc-ae91-4a0472940f97';
        let clientSecret = 'ctIxipJ5950aYDqKyYcKwwe3XaKGJ6CvjEQ7es1EkdHqAhvsKKhC3z9d6DdXEVI2';

        this.props.handleUserAuthentication(clientId, clientSecret);
    }

    handleButtonClick2() {
        let clientId = '12e89c66-774c-4476-8a7ce-5e966ae65796';
        let clientSecret = '3O4rWcFWfca3UE2p6eumnCvVGQkzz7ZVO6FWACo6BttWWgmVNnkCZTUg2hJTFtCW';

        this.props.handleUserAuthentication(clientId, clientSecret);
    }

    handleButtonClick3() {
        let clientId = '3e935b84-55cb-490c-a56b-0f6bc20542c4';
        let clientSecret = 'i25vydFNwS2zkpDYbLXmYWl0yV0UzlP2FB2iKRr09MGg49lmgy56bNRDtG6oDdTc';

        this.props.handleUserAuthentication(clientId, clientSecret);
    }

    handleButtonClickLogout() {
        this.props.handleUserLogout();
    }


    render() {
        let loginForm = (
            <div className="LoginForm">
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={4}>
                            Client ID
                        </Col>
                        <Col sm={8}>
                            <FormControl type="text" placeholder="Client ID"/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={4}>
                            Client Secret
                        </Col>
                        <Col sm={8}>
                            <FormControl type="password" placeholder="Client Secret"/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={8}>
                            <Button onClick={this.handleButtonClick.bind(this)}>
                                Sign in 1
                            </Button>
                            <Button onClick={this.handleButtonClick2.bind(this)}>
                            Sign in 2
                            </Button>
                            <Button onClick={this.handleButtonClick3.bind(this)}>
                            Sign in 3
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>);

        let userForm = (
            <div className="LoginForm">
                clientToken: <span className="smallFont">{this.props.authentication.clientToken}</span>
                <Button onClick={this.handleButtonClickLogout.bind(this)}>
                    Logout
                </Button>
            </div>
        );

        return (
            <div className="Header">
                <div className="HeaderText">
                    Twitter
                </div>
                {!this.props.authentication.isAuthenticated ? loginForm: userForm}
            </div>
        );
    }
}


let mapStateToProps = state => {
    return {
        authentication: state.authentication
    }
};

let mapDispatchToProps = dispatch => {
    return {
        handleUserAuthentication: (clientId, clientSecret) => {
            dispatch(authenticationActions.authenticateUser(clientId, clientSecret));
        },
        handleUserLogout: () => {
            dispatch(authenticationActions.logoutUser())
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);