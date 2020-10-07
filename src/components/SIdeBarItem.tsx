import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import globalStyleCss from '../util/global-style.css';

interface Props {
  onPress: any;
  image?: any;
  text: string;
  style?: any;
}

interface State {}

export default class SideBarItem extends React.Component<Props> {
  state: State = {};

  render() {
    let {onPress, image, text} = this.props;
    return (
      <TouchableOpacity
        style={[globalStyleCss.scrollItem, this.props.style]}
        onPress={onPress}>
        {image && (
          <Image
            resizeMode="contain"
            style={{height: 20, width: 20}}
            source={image}
          />
        )}
        <Text style={[globalStyleCss.text, globalStyleCss.scrollItemText]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingVertical: 8,
  },
});
