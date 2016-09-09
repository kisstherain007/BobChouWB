/**
 * Created by zhoubo on 16/8/29.
 */
import React, {Component} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {COLORS} from '../constants/Theme';
import NotificationToolbar from '../components/NotificationToolbar';
import {toastShort} from '../utils/ToastUtils';

export default class Notification extends Component{

    constructor(props){
        super(props);
        this._onNotificationSelected = this._onNotificationSelected.bind(this);
    }

    componentDidUpdate(){
        console.log("Notification: componentDidUpdate");
    }

    componentWillReceiveProps(){
        console.log("Notification componentWillReceiveProps");
    }

    _onNotificationSelected(index = 0){
        toastShort('selected:' + index);
    }

    render(){
        console.log("Notification: render");
        return(
            <View>
                <NotificationToolbar onSelected={this._onNotificationSelected}/>
                <Text style={{color:COLORS.WB_COLOR_RED}}>Notification</Text>
            </View>
        );
    }
}