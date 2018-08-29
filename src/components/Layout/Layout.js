import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxil from '../../hoc/Auxil';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer : false});
    }

    toggleClickHandler = () => {
        this.setState({showSideDrawer : !this.state.showSideDrawer});
    }

    render() {
        return (
            <Auxil>
                <Toolbar 
                    isAuth= {this.props.isAuthenticated}
                    toggleClick={this.toggleClickHandler}/>
                <SideDrawer 
                    isAuth= {this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Auxil>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }    
}

export default connect(mapStateToProps)(Layout);