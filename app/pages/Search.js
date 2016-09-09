/**
 * Created by zhoubo on 16/8/29.
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import SearchToolbar from '../components/SearchToolbar';

export default class Search extends Component{

    render(){

        return(
            <View>
                <SearchToolbar/>
                <Text>Search</Text>
            </View>
        );
    }
}