export function formatDateString(timestamp) {
  const date = new Date(parseInt(timestamp) * 1000);
  const year = date.getFullYear();
  const month = parseInt(date.getMonth()) + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}
import React, {PropTypes} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import {COLORS} from '../constants/Theme';

export function formatTextString(content){

  // 用户名称 @[\w\p{InCJKUnifiedIdeographs}-]{1,26}

  // 网页链接 http://[a-zA-Z0-9+&@#/%?=~_\-|!:,\.;]*[a-zA-Z0-9+&@#/%=~_|]

  // 话题 #[\p{Print}\p{InCJKUnifiedIdeographs}&&[^#]]+#

  // elementArr.push(<Text key={tag + i + 'text1'}>
  //                   {content.substring(0, content.indexOf(tag))}
  //                   <Image key={tag + i + 'image1'} style={{width:60, height:15}} source={require('../imgs/button_music.png')} resizeMode={Image.resizeMode.contain}/>
  //                   {content.substring(content.indexOf(tag) + tag.length, content.length)}
  //                 </Text>);

  let userNameTag = "@[^@\s]+";

  let httpTag = "http://[a-zA-Z0-9+&@#/%?=~_\-|!:,\.;]*[a-zA-Z0-9+&@#/%=~_|]";

  let themeTalkTag = "#[\p{Print}\p{InCJKUnifiedIdeographs}&&[^#]]+#";

  let httpRegExp = new RegExp(httpTag, "g");
  let userNameRegExp = new RegExp(userNameTag, "g");
  let themeTalkRegExp = new RegExp(themeTalkTag, "g");

  let map = new Map();
  let elementArr = [];
  let viewArr = [];

  let httpArr = [];
  // let userNameAr r = userNameRegExp.exec(content);
  // let themeTalkArr = themeTalkRegExp.exec(content);
  var result;
  while((result = httpRegExp.exec(content)) != null){
    httpArr.push(result);
  }

  if(httpArr != undefined){
    for(let i=0,len=httpArr.length; i<len; i++){
      let startLocation = content.indexOf(httpArr[i]);
      let endLocation = content.indexOf(httpArr[i]) + httpArr[i].length;
      let result = httpArr[i];
      console.log("KKKKKK:", result);
      let tag = "http";
      const location = [startLocation, endLocation, tag];
      elementArr.push(location);
    }

    // for(let i=0,len=httpArr.length; i<len; i++){
    //   content = content.replace(
    //       httpArr[i],
    //         (
    //             <Image key={tag + i + 'image1'}
    //             style={{width:60, height:15}}
    //             source={require('../imgs/button_music.png')}
    //             resizeMode={Image.resizeMode.contain}/>
    //         )
    //       );
    // content = content.replace(/http:\/\/[a-zA-Z0-9+&@#/%?=~_\-|!:,\.;]*[a-zA-Z0-9+&@#/%=~_|]/g, "《《网页》》");
    }

  // if(userNameArr != undefined){
  //   for(let i=0,len=userNameArr.length; i<len; i++){
  //     let startLocation = content.indexOf(userNameArr[i]);
  //     let endLocation = content.indexOf(userNameArr[i]) + userNameArr[i].length;
  //     let tag = "userName";
  //     const location = [startLocation, endLocation, tag];
  //     elementArr.push(location);
  //   }
  // }
  //
  // if(themeTalkArr != undefined){
  //   for(let i=0,len=themeTalkArr.length; i<len; i++){
  //     let startLocation = content.indexOf(themeTalkArr[i]);
  //     let endLocation = content.indexOf(themeTalkArr[i]) + themeTalkArr[i].length;
  //     let tag = "theme";
  //     const location = [startLocation, endLocation, tag];
  //     elementArr.push(location);
  //   }
  // }

  elementArr = elementArr.sort(function(a, b){
      return a[0] - b[0];
  });

  if(elementArr != undefined){

    for(let i=0,len=elementArr.length; i<len; i++){

      let[startLocation, endLocation, tag] = elementArr[i];

      if(i ==0){

        viewArr.push(
            <Text key={"text" + i}>
              {content.substring(0, startLocation)}
              {tag=='http'?
              <Image key={tag + i + 'image'}
                style={{width:60, height:15}}
                source={require('../imgs/button_music.png')}
                resizeMode={Image.resizeMode.contain}/>
                  :
              <Text style={{color: COLORS.WB_LIGHT_COLOR}}>
                {content.substring(startLocation, endLocation)}
              </Text>
              }
              {content.substring(endLocation, (i + 1) < elementArr.length ? elementArr[i + 1][0] : content.length)}
            </Text>
        )
      }else{
        viewArr.push(
            <Text key={"text" + i}>

              {content.substring(elementArr[i][1], startLocation)}

              {tag=='http'?
                  <Image key={tag + i + 'image'}
                      style={{width:60, height:15}}
                      source={require('../imgs/button_music.png')}
                      resizeMode={Image.resizeMode.contain}/>
                  :
                  <Text style={{color: COLORS.WB_LIGHT_COLOR}}>
                    {content.substring(startLocation, endLocation)}
                  </Text>
              }

              {content.substring(endLocation, (i + 1) < elementArr.length ? elementArr[i + 1][0] : content.length)}
            </Text>
        )
      }
    }
  }
  return viewArr;
}

export function fromatHtmlText(content){

  let httpTag = "http://[a-zA-Z0-9+&@#/%?=~_\-|!:,\.;]*[a-zA-Z0-9+&@#/%=~_|]";
  let httpRegExp = new RegExp(httpTag, "g");
  let result;

  let hrefHtml = `<img src="../imgs/button_music.png" />`;

  while((result = httpRegExp.exec(content)) != null){
    content = content.replace(result, hrefHtml);
  }

  return content;
}