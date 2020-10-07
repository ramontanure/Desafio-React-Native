import React from 'react';
import {TouchableOpacity, Text, View, ViewStyle, TextStyle} from 'react-native';
import styl from './style.css';
import globlaStyle, {COLOR} from '../../util/global-style.css';
import LoadingComponent from '../loading';
import globalStyleCss from '../../util/global-style.css';

interface ButtonProps {
  title?: String;
  style?: ViewStyle;
  onPress(): void;
  textColor?: string;
  disabled?: boolean;
  isLoading?: boolean;
  styleText?: TextStyle;
}

class Button extends React.Component<ButtonProps> {
  state = {
    clickAllowed: true,
  };

  onPressHandler = () => {
    if (this.state.clickAllowed) {
      this.props.onPress();
      this.setState({clickAllowed: false});
      setTimeout(() => {
        this.setState({clickAllowed: true});
      }, 1000);
    }
  };

  render() {
    let {
      title,
      style,
      disabled = false,
      children,
      textColor,
      isLoading,
    } = this.props;
    return (
      <TouchableOpacity
        style={[styl.button, style]}
        onPress={this.onPressHandler}>
        {children ? (
          children
        ) : (
          <View
            style={[
              globalStyleCss.center,
              {
                opacity: disabled ? 0.5 : 1,
              },
            ]}>
            {isLoading ? (
              <LoadingComponent isLoading color="white" />
            ) : (
              <Text
                style={[
                  globlaStyle.text,
                  styl.text,
                  this.props.styleText,
                  {color: textColor || 'white'},
                ]}>
                {title && title.toUpperCase()}
              </Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

export default Button;
