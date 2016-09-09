/**
 * Created by zhoubo on 16/8/31.
 */
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {COLORS} from '../constants/Theme';

export default class SearchToolbar extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.containerStyle}>
                <TouchableOpacity style={styles.containerInnerStyle} >
                    <View />
                    <View style={styles.touchableStyle}>
                        <View style={{flexDirection: 'row'}}>
                            <Image style={{width:20, height:20}} source={require('../imgs/profile_search_icon.png')}/>
                            <Text style={{color: 'white', fontSize: 13, marginLeft:8}}>搜索</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{justifyContent: 'flex-end'}}>
                        <Image style={{width:20, height:20}} source={require('../imgs/channel_qrcode.png')}/>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {

    containerStyle:{
        flex: 1,
        height:56,
        flexDirection: 'row',
        backgroundColor: COLORS.WB_COLOR,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    containerInnerStyle:{
        flex: 1,
        backgroundColor: '#90212121',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15
    },
    touchableStyle:{
        flexDirection: 'row',
        height: 40,
        justifyContent:'center',
        alignItems: 'center',
    }
};
