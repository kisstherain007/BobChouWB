/**
 * Created by zhoubo on 16/9/9.
 */
import React, {PropTypes} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import HTMLView from 'react-native-htmlview';

const {width, height} = Dimensions.get('window');

const TimelineItem = ({rowData})=>(

    <TouchableOpacity >
        <View style={styles.containerStyle}>
            <Image style={{width:40, height:40, borderRadius: 60, marginLeft: 10, marginRight:10}}
                source={{uri: rowData.user.avatar_hd}}/>
            <View style={styles.rightConentStyle}>
                <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={{color: 'black', fontSize:13,  marginBottom: 5, fontWeight:'bold',}}>{rowData.user.name}</Text>
                    <Text style={{ fontSize:11, color: '#C1C1C1'}}>{rowData.created_at}</Text>
                </View>
                <Text style={{color:'#4F4F4F',}}>{rowData.text}</Text>
                {rowData.pic_urls.length > 0 ? <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    {picView(rowData)}
                </View> : <View/>
                }
                <View style={{marginTop:10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <HTMLView
                        value={rowData.source}
                        stylesheet={styles_html}
                    />
                    <View style={{flexDirection:'row', alignItems: 'center'}}>
                        <Image style={styles.itemLittleImageStyle} source={require('../imgs/timeline_item_like_icon.png')}/>
                        <Text style={styles.itemLittleTextStyle}>10</Text>
                        <Image style={styles.itemLittleImageStyle} source={require('../imgs/timeline_item_forward_icon.png')}/>
                        <Text style={styles.itemLittleTextStyle}>10</Text>
                        <Image style={styles.itemLittleImageStyle} source={require('../imgs/timeline_item_commented_icon.png')}/>
                        <Text style={styles.itemLittleTextStyle}>10</Text>
                        <Image style={[styles.itemLittleImageStyle, {width:30, height:30}]} source={require('../imgs/timeline_more_button.png')}/>
                    </View>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

const picView = (rowData) => {

    let pics = [];
    let picCount = rowData.pic_urls.length;
    let {picWidth, picHeight} = {picWidth:width/4, picHeight: height/5};
    // if(picCount >= 1){
    //     picWidth = (picWidth - 50);
    //     picHeight = picWidth;
    // }

    for(var i=0,len=rowData.pic_urls.length; i<len; i++){

        pics.push(
            <Image key={i} style={{width:picWidth, height:picWidth, margin:3}} source={{uri: rowData.pic_urls[i].thumbnail_pic}} resizeMode={Image.resizeMode.cover}/>
        );
    }

    return pics;
}


const styles = StyleSheet.create({

    containerStyle:{
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },
    rightConentStyle:{
        flex:6,
        flexDirection: 'column',
    },
    itemLittleImageStyle:{
        width:19,
        height:19,
        marginLeft: 5
    },
    itemLittleTextStyle:{
        color: '#C1C1C1',
        fontSize:12
    }
});

var styles_html = StyleSheet.create({
    a: {
        fontWeight: 'normal',
        color: '#C1C1C1', // pink links
        fontSize: 10
    },
})

export default TimelineItem;