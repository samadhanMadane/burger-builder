import React, { Component } from 'react';
// import classes from './Orders.css';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../Store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    orderDelete = (event,orderId) => {
        event.preventDefault();
        //console.log(orderId);
        this.props.onDeleteOrder(this.props.token, orderId, this.props.userId);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                        <Order 
                            key= {order.id}
                            ingredients= {order.ingredients}
                            price={+order.price} 
                            onDelete={(event) => this.orderDelete(event, order.id)}/>
                    ))
        }
        return (
            <div> 
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        onDeleteOrder: (token, orderId, userId) => dispatch(actions.deleteOrder(token, orderId, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));