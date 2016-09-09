/**
 * Created by zhoubo on 16/8/29.
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PersonalToolbar from '../components/PersonalToolbar';

export default class Personal extends Component{

    componentWillReceiveProps(){
        console.log("Personal componentWillReceiveProps");
    }

    render(){

        return(
            <View>
                <PersonalToolbar/>
                <Text>Personal</Text>
            </View>

        );
    }
}