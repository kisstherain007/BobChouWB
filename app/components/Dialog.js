/**
 * Created by zhoubo on 16/9/8.
 */

import React, {PropTypes} from 'react'
import {Animated,
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    Easing,
} from 'react-native';
import {COLORS} from '../constants/Theme';
const navigatorH = 64; // navigator height
const {width, height} = Dimensions.get('window');
const [DialogWidth, DialogHeight] = [width/2, height/7];
const [left, top] = [0, 0];


const propTypes = {
    dialogMarginTop: PropTypes.number
}

export default class Dialog extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(-1),
            title: "",
            hide: true
        };
    }

    //显示动画
    in() {
        Animated.parallel([
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 300,
                    toValue: 1,
                }
            )
        ]).start();
    }

    //隐藏动画
    out(){
        Animated.parallel([
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 300,
                    toValue: -1,
                }
            )
        ]).start();

        setTimeout(
            () => {
                this.setState({hide: true});
                //还原到顶部
                Animated.timing(
                    this.state.offset,
                    {
                        easing: Easing.linear,
                        duration: 300,
                        toValue: -1,
                    }
                ).start();
            },
            300
        );
    }

    show(){
        if(this.state.hide){
            this.setState({title: "", hide: false}, this.in);
        }
        return false;
    }

    dismiss(){
        if(!this.state.hide){
            this.out();
        }
        return true;
    }

    render(){

        let dialogMarginTop = this.props.dialogMarginTop;

        if(this.state.hide){
            return(<View/>);
        }else{
            return(

                <View style={styles.containerStyle}>
                    <Animated.View style={[styles.contentStyle, {transform: [{
                        translateY: this.state.offset.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, dialogMarginTop]
                        }),
                    }]
                    }]}>
                        <View style={{flexDirection: 'column', flex: 1, marginLeft:10, marginRight:10}}>
                            <View style={{flexDirection: 'row', flex:2, alignItems: 'center'}}>
                                <Image style={{width: 40, height:40, marginRight:10, borderRadius:60}} source={{uri: this.props.imageUrl}}/>
                                <Text >{this.props.title}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent:'space-between', flex:1}}>
                                <Text style={{color: COLORS.WB_LIGHT_COLOR}}>管理</Text>
                                <Text style={{color: COLORS.WB_LIGHT_COLOR}}>新账户</Text>
                            </View>
                        </View>
                    </Animated.View>
                </View>
            );
        }

    }
}

const styles = StyleSheet.create({

    containerStyle: {
        position:"absolute",
        width: width,
        height: height,
        left:left,
        top:top,
    },
    mask: {
        justifyContent:"center",
        backgroundColor:"#383838",
        opacity:0.8,
        position:"absolute",
        width:width,
        height:height,
        left:left,
        top:top,
    },
    contentStyle:{
        width: DialogWidth,
        height: DialogHeight,
        backgroundColor: 'white',
        marginLeft: 10,
        borderRadius:1
    }
});

Dialog.propTypes = propTypes;