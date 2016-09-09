/**
 * Created by zhoubo on 16/9/2.
 */
import React, {PropTypes} from 'react';
import {View, Image, ListView, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImageButton from '../components/ImageButton';
import {toastShort} from '../utils/ToastUtils';
import Dialog from './Dialog';
const {width, height} = Dimensions.get('window');
const {headerHeight} = {headerHeight: parseInt((height/4)/2+40)};
export const menuDatas = [
    {id:0,itemText:"全部"},
    {id:1,itemText:"原创微博"},
    {id:2,itemText:"好友圈"},
    {id:3,itemText:"特别关注"},
    {id:4,itemText:"名人明星"},
    {id:5,itemText:"搞笑"},
    {id:6,itemText:"企业"},
    {id:7,itemText:"同事"},
    {id:8,itemText:"名人"},
    {id:9,itemText:"同学"},
    {id:10,itemText:"媒体"},
    {id:11,itemText:"数码"},
    {id:12,itemText:"互联网"},
];

const propTypes = {
    pressListRow: PropTypes.func,
    pressSettingItem: PropTypes.func
};

var dialogHide = true;

export default class DrawerMenuContent extends React.Component{

    constructor(props){
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            selectedId: 0,
            dataSource: ds.cloneWithRows(menuDatas)
        };

        this._renderRow = this._renderRow.bind(this);
        this._pressRow = this._pressRow.bind(this);
        this.pressHeader = this.pressHeader.bind(this);
    }

    _pressRow(rowData){

        this.setState({selectedId: rowData.id, dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(menuDatas)});
        this.props.pressListRow(rowData);
    }

    _renderRow(rowData, sectionID, rowID, highlightRow){

        let selectedColor = this.state.selectedId == rowData.id ? 'rgba( 255, 255, 255, 0.2 )' : 'transparent';

        return(
            <TouchableOpacity style={[styles.itemStyle, {backgroundColor: selectedColor}]} onPress={()=>this._pressRow(rowData)}>
                    <Text style={styles.itemTextStyle}>{rowData.itemText}</Text>
            </TouchableOpacity>
        );
    }

    pressHeader(){

        if(dialogHide){

            dialogHide = this.refs.dialog.show();
        }else {
            dialogHide = this.refs.dialog.dismiss();
        }
    }

    render(){

        const {getAccountInfo} = this.props;

        return(
            <LinearGradient
                colors={['#6D947A', '#1B5665', '#1D3159']}
                style={{flex:1}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
                        <ImageButton
                            containerStyle={{alignItems: 'center', justifyContent: 'center'}}
                            imageStyle={{width: 80, height: 80, borderRadius:60}}
                            source={{uri: getAccountInfo.accountInfo.avatar_large}}
                            onPress={this.pressHeader}/>
                    </View>
                    <View style={{flex: 8}}>
                        <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}/>
                    </View>
                    <View style={{flex: 1.3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10, marginRight: 10}}>
                        <ImageButton
                            text={"离线"}
                            textStyle={{color: 'rgba( 255, 255, 255, 0.7 )', fontSize: 8}}
                            containerStyle={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
                            imageStyle={styles.bottomImageStyle}
                            source={require('../imgs/sidebar_icon_offline.png')}
                            onPress={()=>toastShort('sidebar_icon_offline')}/>
                        <ImageButton
                            text={"显示"}
                            textStyle={{color: 'rgba( 255, 255, 255, 0.7 )', fontSize: 8}}
                            containerStyle={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
                            imageStyle={styles.bottomImageStyle}
                            source={require('../imgs/sidebar_icon_display.png')}
                            onPress={()=>toastShort('sidebar_icon_offline')}/>
                        <ImageButton
                            text={"主题"}
                            textStyle={{color: 'rgba( 255, 255, 255, 0.7 )', fontSize: 8}}
                            containerStyle={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
                            imageStyle={styles.bottomImageStyle}
                            source={require('../imgs/sidebar_icon_theme.png')}
                            onPress={()=>toastShort('sidebar_icon_offline')}/>
                        <ImageButton
                            text={"夜晚"}
                            textStyle={{color: 'rgba( 255, 255, 255, 0.7 )', fontSize: 8}}
                            containerStyle={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
                            imageStyle={styles.bottomImageStyle}
                            source={require('../imgs/sidebar_icon_night.png')}
                            onPress={()=>toastShort('sidebar_icon_offline')}/>
                    </View>

                    <Dialog ref="dialog" dialogMarginTop={headerHeight} title={getAccountInfo.accountInfo.name} imageUrl={getAccountInfo.accountInfo.profile_image_url}/>
                </View>
            </LinearGradient>
        );
    }
}

DrawerMenuContent.propTypes = propTypes;

const styles = StyleSheet.create({

    itemTextStyle:{
        color: 'white',
        fontSize: 15
    },
    itemStyle:{
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginLeft:10,
        marginRight:10,
    },
    bottomImageStyle:{
        width:43,
        height:43,
    }
});