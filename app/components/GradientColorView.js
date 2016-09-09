// /**
//  * Created by zhoubo on 16/9/1.
//  */
// import React, {PropTypes} from 'react';
// import {View, Text, ToolbarAndroid, Image, StyleSheet, ViewPagerAndroid} from 'react-native';
// import requireNativeComponent from 'requireNativeComponent';
//
// const propTypes = {
//     ...View.propTypes,
//     startColor: PropTypes.string,
//     endColor: PropTypes.string,
// };
//
// export default class GradientColorView extends React.Component{
//
//     render(){
//
//         return(
//             <NativeGradientColorView
//                 style={this.props.imageStyle}
//                 startColor={this.props.startColor}
//                 endColor={this.props.endColor}>
//             </NativeGradientColorView>
//         );
//     }
// }
//
// GradientColorView.propTypes = propTypes;
//
// var NativeGradientColorView = requireNativeComponent('RCTGradientColorView', GradientColorView);