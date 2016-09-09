/**
 * Created by zhoubo on 16/9/1.
 */
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {COLORS} from '../constants/Theme';

export default class PersonalToolbar extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return(

            <View style={styles.containerStyle}>
                <View style={{flex: 1}}/>
                <Text style={{flex: 1, fontSize:18, color: 'white', textAlign:'center', alignSelf: 'center'}}>kisstherain</Text>
                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                    <Image style={{width: 35, height: 35}} source={require('../imgs/button_icon_search.png')}/>
                    <Image style={{width: 35, height: 35}} source={require('../imgs/button_icon_setting.png')}/>
                </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
};