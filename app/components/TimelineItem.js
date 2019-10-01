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
    Dimensions,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {formatTextString} from '../utils/FormatUtils';
import {toastShort} from '../utils/ToastUtils';
// import TimelineItemText from './TimelineItemText';
// import HTML from 'react-native-fence-html';
import ReactHtml from '../components/ReactHtml';

const {width, height} = Dimensions.get('window');

export default class TimelineItem extends React.Component{

    constructor(props){
        super(props);
        this._getItemImage = this._getItemImage.bind(this);
        this.state={
            newImageWidth:100,
            newImageHeight:100
        }
        console.log("xxeeeeeee", ">>>>>>>>>");
    }

    componentDidMount(){

        const {rowData} = this.props;

        let picCount = rowData.pic_urls.length;
        let screenWidth = width;
        let screenHeight = height;
        if(picCount == 1){
            Image.getSize(rowData.bmiddle_pic, (width, height)=>{

                let imageWidth = this.state.newImageWidth;
                let imageHeight = this.state.newImageHeight;
                if(width > screenWidth/2){

                    imageWidth = screenWidth/2;
                    imageHeight = (imageWidth*height)/width;

                }else{

                    imageWidth = width;
                    imageHeight = (imageWidth*height)/width;
                }

                if(imageHeight > imageWidth + 50){

                    imageHeight = imageWidth + 50;
                }

                this.setState({newImageWidth:imageWidth, newImageHeight:imageHeight});
            });
        }
    }

    render(){

        const {rowData} = this.props;
        console.log("xxeeeeeee<<<<<<<<<<", ">>>>>>>>>" + this.state.newImageWidth);
        return(
            <TouchableOpacity >
                <View style={styles.containerStyle}>
                    <Image style={{width:40, height:40, borderRadius: 60, marginLeft: 10, marginRight:10}}
                        source={{uri: rowData.user.avatar_hd}}
                        onlo/>
                    <View style={styles.rightConentStyle}>
                        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                            <Text style={{color: 'black', fontSize:13,  marginBottom: 5, fontWeight:'bold',}}>{rowData.user.name}</Text>
                            <Text style={{ fontSize:11, color: '#C1C1C1'}}>{rowData.created_at}</Text>
                        </View>
                        {/*<Text style={{color:'#4F4F4F',}}>*/}
                        {/*{rowData.text}*/}
                        {/*</Text>*/}
                        <Text>
                            {formatTextString(rowData.text)}
                        </Text>

                        {rowData.pic_urls.length > 0 ? <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                            {

                                this._getItemImage(rowData)
                            }
                        </View> : <View/>
                        }
                        <View style={{marginTop:10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <HTMLView
                                value={rowData.source}
                                stylesheet={styles_html}
                            />
                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Image style={styles.itemLittleImageStyle} source={require('../imgs/timeline_item_like_icon.png')}/>
                                <Text style={styles.itemLittleTextStyle}>{rowData.comments_count}</Text>
                                <Image style={styles.itemLittleImageStyle} source={require('../imgs/timeline_item_forward_icon.png')}/>
                                <Text style={styles.itemLittleTextStyle}>{rowData.reposts_count}</Text>
                                <Image style={styles.itemLittleImageStyle} source={require('../imgs/timeline_item_commented_icon.png')}/>
                                <Text style={styles.itemLittleTextStyle}>{rowData.comments_count}</Text>
                                <Image style={[styles.itemLittleImageStyle, {width:30, height:30}]} source={require('../imgs/timeline_more_button.png')}/>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _getItemImage(rowData){

        let pics = [];
        let picCount = rowData.pic_urls.length;
        let {picWidth, picHeight} = {picWidth:width/4, picHeight: height/5};

        if(picCount == 1){

            pics.push(
                <Image key={0} style={{width:this.state.newImageWidth , height:this.state.newImageHeight, margin:3}}
                    source={{uri: rowData.bmiddle_pic}} resizeMode={Image.resizeMode.contain}/>
            );

        }else{

            for(var i=0,len=rowData.pic_urls.length; i<len; i++){

                pics.push(
                    <Image key={i} style={{width:picWidth, height:picWidth, margin:3}}
                        source={{uri: rowData.pic_urls[i].thumbnail_pic}} resizeMode={Image.resizeMode.cover}/>
                );
            }
        }

        return pics;
    }
}

// const TimelineItem = ({rowData, onImageLoadedWH})=>(
//
//     <TouchableOpacity >
//         <View style={styles.containerStyle}>
//             <Image style={{width:40, height:40, borderRadius: 60, marginLeft: 10, marginRight:10}}
//                 source={{uri: rowData.user.avatar_hd}}
//             onlo/>
//             <View style={styles.rightConentStyle}>
//                 <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
//                     <Text style={{color: 'black', fontSize:13,  marginBottom: 5, fontWeight:'bold',}}>{rowData.user.name}</Text>
//                     <Text style={{ fontSize:11, color: '#C1C1C1'}}>{rowData.created_at}</Text>
//                 </View>
//                 {/*<Text style={{color:'#4F4F4F',}}>*/}
//                     {/*{rowData.text}*/}
//                 {/*</Text>*/}
//                 <Text>
//                     {formatTextString(rowData.text)}
//                 </Text>
//
//                 {rowData.pic_urls.length > 0 ? <View style={{flexDirection:'row', flexWrap:'wrap'}}>
//                     {picView(rowData)}
//                 </View> : <View/>
//                 }
//                 <View style={{marginTop:10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
//                     <HTMLView
//                         value={rowData.source}
//                         stylesheet={styles_html}
//                     />
//                     <View style={{flexDirection:'row', alignItems: 'center'}}>
//                         <Image style={styles.itemLittleImageStyle} source={require('../imgs/timeline_item_like_icon.png')}/>
//                         <Text style={styles.itemLittleTextStyle}>{rowData.comments_count}</Text>
//                         <Image style={styles.itemLittleImageStyle} source={require('../imgs/timeline_item_forward_icon.png')}/>
//                         <Text style={styles.itemLittleTextStyle}>{rowData.reposts_count}</Text>
//                         <Image style={styles.itemLittleImageStyle} source={require('../imgs/timeline_item_commented_icon.png')}/>
//                         <Text style={styles.itemLittleTextStyle}>{rowData.comments_count}</Text>
//                         <Image style={[styles.itemLittleImageStyle, {width:30, height:30}]} source={require('../imgs/timeline_more_button.png')}/>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     </TouchableOpacity>
// );


// const picView = (rowData) => {
//
//     let pics = [];
//     let picCount = rowData.pic_urls.length;
//     let {picWidth, picHeight} = {picWidth:width/4, picHeight: height/5};
//
//     if(picCount == 1){
//
//         pics.push(
//             <Image key={0} style={{width:this.state.newImageWidth , height:100, margin:3}}
//                 source={{uri: rowData.pic_urls[0].thumbnail_pic}} resizeMode={Image.resizeMode.cover}/>
//         );
//
//     }else{
//
//         for(var i=0,len=rowData.pic_urls.length; i<len; i++){
//
//             pics.push(
//                 <Image key={i} style={{width:picWidth, height:picWidth, margin:3}}
//                     source={{uri: rowData.pic_urls[i].thumbnail_pic}} resizeMode={Image.resizeMode.cover}/>
//             );
//         }
//     }
//
//     return pics;
// }



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

var styles_html_img = StyleSheet.create({
    a: {
        fontWeight: 'normal',
        color: '#C1C1C1', // pink links
        fontSize: 10,
        width:200

    },
})

export default TimelineItem;