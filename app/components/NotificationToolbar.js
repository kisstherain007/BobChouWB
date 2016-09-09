/**
 * Created by zhoubo on 16/8/31.
 */
import React, {PropTypes} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/Theme';

const titleArr = ["@我", "评论", "赞", "私信"];
const propTypes = {
    onSelected: PropTypes.func
};

export default class NotificationToolbar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectedIndex: 0
        };

        this._onPress = this._onPress.bind(this);
    }

    _onPress(index){
        this.setState({
            selectedIndex: index
        });
        this.props.onSelected(index);
    }

    render(){
        let contentView = [];
        for(let i=0,len=titleArr.length; i<len; i++){
            let selected = i === this.state.selectedIndex;
            contentView.push(<TouchableOpacity key={i} onPress={()=>this._onPress(i)}><Text style={[styles.toolbarTextStyle, {opacity : selected ? 1 : 0.5}]}>{titleArr[i]}</Text></TouchableOpacity>);
        };
        return(
            <View style={styles.containerStyle}>
                {contentView}
            </View>
        );
    }
}

NotificationToolbar.propTypes = propTypes;

const styles = StyleSheet.create({

    containerStyle:{
        flex: 1,
        height:56,
        flexDirection: 'row',
        backgroundColor: COLORS.WB_COLOR,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 28,
        paddingRight: 28,
    },
    toolbarTextStyle:{
        color: 'white',
        opacity: 0.5,
        fontSize: 16
    }
});