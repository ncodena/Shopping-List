import React, {Component, Fragment} from 'react';
import {
Collapse,
Navbar,
NavbarToggler,
NavbarBrand,
Nav,
NavItem,
Container,
}from 'reactstrap' ;

import RegisterModal from './auth/registerModal';
import LoginModal from './auth/loginModal';
import Logout from './auth/Logout';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import cart from './img/cart.png'
class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    render(){
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
        
        <Fragment>
            <NavItem>
                <span className="navbar-text mr-3">
                    <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                </span>    
            </NavItem>
            <NavItem>
                <Logout />
            </NavItem>
        </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
            <NavItem>
                <LoginModal/>
            </NavItem>
            </Fragment>
        );

return (
<div>
    <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
            
            <img width='20%' src={cart} alt='cart-logo'/>
            <NavbarBrand href="/">Shopping List</NavbarBrand>
            
            
            <NavbarToggler onClick={this.toggle}></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {isAuthenticated ? authLinks : guestLinks }
                </Nav>
            </Collapse>

        </Container>
    </Navbar>
</div>

);

    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);