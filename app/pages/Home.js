/**
 * Created by zhoubo on 16/8/29.
 */
import React, {Component} from 'react';
import {View, Text, ToolbarAndroid, Image, StyleSheet, ViewPagerAndroid, ListView, Dimensions} from 'react-native';
import {COLORS} from '../constants/Theme';
import {toastShort} from '../utils/ToastUtils';
import HomeToolbar from '../components/HomeToolbar';
import {getAccountInfo} from '../actions/getAccountInfoAction';
var { NativeModules } = require('react-native');

import * as params from '../constants/WBConfig';
import {getFriendsTimeline} from '../actions/statusesTimelineAction';
import {Global} from '../constants/Global';
import {GoWBAuthAccess, LoginOut} from '../utils/AccessLogin';
import TimelineItem from '../components/TimelineItem';

const {width, height} = Dimensions.get('window');
var titleArr = ["", "Weico热赞榜", "热门微博"];
export var AccountInfo = {
    'KEY_ACCESS_TOKEN' : '',
    'KEY_UID' : ''
};
export default class Home extends Component{

    constructor(props){
        super(props);
        this._onPageSelected = this._onPageSelected.bind(this);
        this.onMenuPress = this.onMenuPress.bind(this);
        this.onEditPress = this.onEditPress.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this._renderSeperator = this._renderSeperator.bind(this);
        this.state = {
            selectedIndex: 0,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            statuses: [],
            onlyImageWH:[]
        };
    }

    componentDidMount(){

        console.log('Home: componentDidMount');

        GoWBAuthAccess((result)=>{
            AccountInfo = result,
                Global.UserInfo = AccountInfo,
                this.props.dispatch(getFriendsTimeline());
        });
    }

    onMenuPress(){
        this.props.drawer.openDrawer();
    }

    onEditPress(){

        LoginOut();
    }

    _onPageSelected(e){
        this.setState({selectedIndex:e.nativeEvent.position});
    }

    _renderRow(rowData){

        return(
            <TimelineItem rowData={rowData} />
        );
    }
    _renderSeperator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    width: width-70,
                    height: adjacentRowHighlighted ? 0.5 : 0.5,
                    backgroundColor: adjacentRowHighlighted ? '#F0F0F0' : '#F0F0F0',
                    justifyContent: 'flex-end', alignSelf: 'flex-end'}}
            >
            </View>
        );
    }

    render(){

        titleArr[0] = this.props.selectedMenu.itemText;

        const{getFriendsTimeline} = this.props;
        if(getFriendsTimeline.friendsTimeline.statuses !== undefined){
            console.log(getFriendsTimeline.friendsTimeline.statuses);
            this.state.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(getFriendsTimeline.friendsTimeline.statuses);
        }

        return(
           <View style={{flex: 1, flexDirection: 'column'}}>
               <HomeToolbar title={titleArr[this.state.selectedIndex]}
                   dotViewCount={titleArr.length}
                   dotViewSelectedIndex={this.state.selectedIndex}
                   onPress1={this.onMenuPress}
                   onPress2={this.onEditPress}
                   {...this.props}/>
               <ViewPagerAndroid
                   initialPage={0}
                   style={styles.viewPagerStyle}
                   onPageSelected={this._onPageSelected}>
                   <View>
                       <ListView dataSource={this.state.dataSource} renderRow={this._renderRow} renderSeparator={this._renderSeperator}/>
                   </View>
                   <View>
                       <Text style={{color:COLORS.WB_COLOR}}>home2</Text>
                   </View>
                   <View>
                       <Text style={{color:COLORS.WB_COLOR}}>home3</Text>
                   </View>
               </ViewPagerAndroid>
           </View>
        );
    }
}

const styles = StyleSheet.create({

    viewPagerStyle:{
        flex: 1
    }
});