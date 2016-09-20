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
import requireNativeComponent from 'requireNativeComponent';

const propTypes = {
    ...View.propTypes,
    contentText: PropTypes.string
}

export default class TimelineItemText extends React.Component{

    constructor(props){
        super(props)
    }

    render(){

        const {
            children
        } = this.props;

        return(
            <View style={{flex:1}}>
                <NativeWBTextView
                    contentText="zhoubo" >
                </NativeWBTextView>
            </View>
        );
    }
}

TimelineItemText.propTypes = propTypes;

var NativeWBTextView = requireNativeComponent('RCTWBTextView', TimelineItemText);