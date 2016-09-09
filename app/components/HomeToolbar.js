/**
 * Created by zhoubo on 16/8/31.
 */
import React, {PropTypes} from 'react';
import {View, Text, ToolbarAndroid, Image, StyleSheet, ViewPagerAndroid} from 'react-native';
import ImageButton from '../components/ImageButton';
import {toastShort} from '../utils/ToastUtils';
import {COLORS} from '../constants/Theme';

const propTypes = {
    title: PropTypes.string,
    dotViewCount: PropTypes.number,
    dotViewSelectedIndex : PropTypes.number,
    onPress1: PropTypes.func,
    onPress2: PropTypes.func
};

export default class HomeToolbar extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        console.log("HomeToolbar: render");
        let dotViewArr = [];
        for(var i=0; i<this.props.dotViewCount; i++){
            var isSelected = this.props.dotViewSelectedIndex === i;
            dotViewArr.push(<DotView key={i}  isSelected={isSelected}/>);
        }

        return(
            <View style={styles.toolbarInnerStyle}>
                <ImageButton imageStyle={styles.toolbarLeftImageStyle} source={require('../imgs/button_icon_group.png')} onPress={this.props.onPress1}/>
                <View style={{flexDirection: 'column', alignSelf: 'flex-end', marginBottom: 5}}>
                    <Text style={styles.toolbarInnerTextStyle}>{this.props.title}</Text>
                    <View style={{flexDirection: 'row', justifyContent:'center', marginTop: 5}}>
                        {dotViewArr}
                    </View>
                </View>
                <ImageButton imageStyle={styles.toolbarRightImageStyle} source={require('../imgs/mask_timeline_top_icon_2.png')} onPress={this.props.onPress2}/>
            </View>
        );
    }
}

class DotView extends React.Component{

    render(){
        let _opacity = this.props.isSelected ? 1 : 0.5;
        return(
            <View style={[styles.dotView1, {opacity: _opacity}]} />
        );
    }
}



HomeToolbar.propTypes = propTypes;

const styles = StyleSheet.create({

    toolbarInnerStyle:{
        height:56,
        flexDirection: 'row',
        backgroundColor: COLORS.WB_COLOR,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    toolbarLeftImageStyle:{
        width: 40,
        height: 40,
        marginLeft: 10
    },
    toolbarRightImageStyle:{
        width: 40,
        height: 40,
        marginRight: 10
    },
    toolbarInnerTextStyle:{
        color: 'white',
        fontSize: 18,
    },
    dotView1:{
        width: 6,
        height: 6,
        backgroundColor: 'white',
        borderRadius: 60,
        marginLeft: 2,
        marginRight:2,
        opacity: 1
    }
});