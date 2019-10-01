/**
 * Created by zhoubo on 16/10/1.
 */
import React,{PropTypes} from 'react';
import {Image, PanResponder, Text} from 'react-native';
import {toastShort} from '../utils/ToastUtils';

export default class TouchableImage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            eventName:'',
            pos: '',
        };
        this.myPanResponder={}
    }


    render(){
        return(
            <Text
                key={'image'}
                style={{width:70, height:17.5, color:'white'
                ,backgroundColor:'gray', borderRadius:10,
                fontSize:10, padding:20}}
                >
                网页
                </Text>
        );
    }
}