import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AnimatedSwitch } from 'react-router-transition';
import './App.css';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders  from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';

import Logout from './containers/Auth/Logout/Logout';
import * as actions from './Store/actions/index';


//For Optimization of project
const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    

    let routes = (
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        {/* <Switch> */}
                <Route path="/auth" exact component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                {/* <Redirect to="/" /> */}
        {/* </Switch> */}
      </AnimatedSwitch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          {/* <Switch> */}
                <Route path="/checkout" component={asyncCheckout} />
                <Route path="/orders" component={asyncOrders} />
                <Route path="/logout" exact component={Logout} />
                <Route path="/auth" exact component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                {/* <Redirect to="/" /> */}
        {/* </Switch> */}
      </AnimatedSwitch>
      );
    }

    return (
      <div>
         <Layout>
            {routes}
         </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
