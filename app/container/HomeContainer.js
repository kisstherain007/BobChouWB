/**
 * Created by zhoubo on 16/9/2.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Home from '../pages/Home';

class HomeContainer extends Component{

    render(){
        return(
            <Home {...this.props}/>
        );
    }
}

function mapStateToProps(state) {
    const {getAccountInfo, getFriendsTimeline} = state;
    return {
        getAccountInfo,
        getFriendsTimeline
    };
}

export default connect(mapStateToProps)(HomeContainer);