/**
 * Created by zhoubo on 16/8/30.
 */
import React,{PropTypes} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';

const propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    textStyle: Text.propTypes.style,
    imageStyle: View.propTypes.style,
    containerStyle: View.propTypes.style,
    source: PropTypes.oneOfType([
        PropTypes.shape({
            uri: PropTypes.string,
        }),
        // Opaque type returned by require('./image.jpg')
        PropTypes.number,
    ]),
    // image: Image.propTypes.
};

export default class ImageButton extends React.Component{

    constructor(props){
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    onPress(){
        if(this.props.onPress == undefined){
            return;
        }
        this.props.onPress();
    }

    render(){
        return(
            <TouchableOpacity style={this.props.containerStyle} onPress={this.onPress}>
                <Image style={[this.props.imageStyle, {alignItems: 'center', justifyContent: 'flex-end'}]} source={this.props.source}>
                </Image>
                <Text style={this.props.textStyle}>{this.props.text != undefined ? this.props.text : ""}</Text>
            </TouchableOpacity>
        );
    }
}

ImageButton.propTypes = propTypes;