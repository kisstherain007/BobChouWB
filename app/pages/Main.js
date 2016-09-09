/**
 * Created by zhoubo on 16/8/29.
 */
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ToolbarAndroid, StatusBar, DrawerLayoutAndroid, TouchableHighlight} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {toastShort} from '../utils/ToastUtils';
import Home from './Home';
import HomeContainer from '../container/HomeContainer';
import Notification from './Notification';
import Search from './Search';
import Personal from './Personal';
import {COLORS} from '../constants/Theme';
import GradientColorView from '../components/GradientColorView';
import LinearGradient from 'react-native-linear-gradient';
import DrawerMenuContent, {menuDatas} from '../components/DrawerMenuContent';
import {GoWBAuthAccess} from '../utils/AccessLogin';
import {getAccountInfo, getFriends} from '../actions/getAccountInfoAction';
import {Global} from '../constants/Global';

export var AccountInfo = {
    'KEY_ACCESS_TOKEN' : '',
    'KEY_UID' : ''
};

export default class Main extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedTab:'home',
            selectedMenu: menuDatas[0]
        };
        this._pressMenuListRow = this._pressMenuListRow.bind(this);
    }

    componentDidMount(){
        console.log('Main: componentDidMount');
        GoWBAuthAccess((result)=>{
            AccountInfo = result,
            Global.UserInfo = AccountInfo,
            this.props.dispatch(getAccountInfo())
            // this.props.dispatch(getFriends()),
            // this._getLimitCountFromSina()

        });
    }

    // _getLimitCountFromSina(){
    //
    //     fetch("https://api.weibo.com/2/account/rate_limit_status.json"+ "?access_token=" + Global.UserInfo.KEY_ACCESS_TOKEN, {
    //         method: 'get',
    //     })
    //         .then((response) => response.json())
    //         .then((responseText) => {
    //             console.log(responseText);
    //         })
    //         .catch((error) => {
    //             console.warn(error);
    //         })
    //         .done();
    // }

    _pressMenuListRow(rowData){
        this.refs.drawer.closeDrawer();
        this.setState({selectedMenu:rowData});
    }

    render(){
        var navigationView = (
            <DrawerMenuContent pressListRow={this._pressMenuListRow} {...this.props}/>
        );

        return(

        <DrawerLayoutAndroid
            ref="drawer"
            drawerWidth={270}
            drawerPosition={DrawerLayoutAndroid.positions.left}
            renderNavigationView={() => navigationView}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <StatusBar
                    backgroundColor={COLORS.WB_COLOR}
                    barStyle="light-content"/>
                <TabNavigator>
                    <TabNavigator.Item
                        title="主页"
                        selected={this.state.selectedTab === 'home'}
                        renderIcon={()=><Image style={styles.tabIconStyle} source={require("../imgs/home_tab_icon_1.png")}/>}
                        renderSelectedIcon={()=><Image style={styles.tabIconStyle} source={require("../imgs/home_tab_icon_1_selected.png")}/>}
                        onPress={()=>this.setState({selectedTab:'home'})}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}>
                            <HomeContainer selectedMenu={this.state.selectedMenu} {...this.props} drawer={this.refs.drawer}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="通知"
                        selected={this.state.selectedTab === 'notification'}
                        renderIcon={()=><Image style={styles.tabIconStyle} source={require("../imgs/home_tab_icon_2.png")}/>}
                        renderSelectedIcon={()=><Image style={styles.tabIconStyle} source={require("../imgs/home_tab_icon_2_selected.png")}/>}
                        onPress={()=>this.setState({selectedTab:'notification'})}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}>
                        <Notification {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="搜索"
                        selected={this.state.selectedTab === 'search'}
                        renderIcon={()=><Image style={styles.tabIconStyle} source={require("../imgs/home_tab_icon_3.png")}/>}
                        renderSelectedIcon={()=><Image style={styles.tabIconStyle} source={require("../imgs/home_tab_icon_3_selected.png")}/>}
                        onPress={()=>this.setState({selectedTab:'search'})}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}>
                        <Search/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="个人"
                        selected={this.state.selectedTab === 'personal'}
                        renderIcon={()=><Image style={styles.tabIconStyle} source={require("../imgs/home_tab_icon_4.png")}/>}
                        renderSelectedIcon={()=><Image style={styles.tabIconStyle} source={require("../imgs/home_tab_icon_4_selected.png")}/>}
                        onPress={()=>this.setState({selectedTab:'personal'})}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}>
                        <Personal/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        </DrawerLayoutAndroid>
        );
    }
}

const styles = StyleSheet.create({

    tabIconStyle:{
        width: 26,
        height: 26
    },
    textStyle:{
        color:'gray',
    },
    selectedTextStyle:{
        color:COLORS.WB_COLOR,
    },
    navigationView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'stretch'
    },
    leftMenuStyle: {
        height: 50,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        justifyContent: 'center'
    },
    primaryButton: {
        borderRadius: 100 / 2,
        backgroundColor: 'transparent',
    },
    primaryCaption: {
        color: 'white',
    },
});