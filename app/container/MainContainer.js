/**
 * Created by zhoubo on 16/8/29.
 */
import React, {Component} from 'react';
import Main from '../pages/Main';
import { connect } from 'react-redux';

class MainContainer extends Component{

    render(){
        return(
            <Main {...this.props}/>
        );
    }
}
function mapStateToProps(state) {
    const {getAccountInfo} = state;
    return {
        getAccountInfo
    };
}

export default connect(mapStateToProps)(MainContainer);
