import * as React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import globalStyleCss from '../util/global-style.css';

interface Props {
  isSelected: boolean;
  title: string;
  onPress(): void;
}

export default class CheckBox extends React.Component<Props> {
  getSource = (isSelected: boolean) => {
    if (isSelected) {
      return require('./../assets/check.png');
    } else {
      return require('./../assets/check-blank.png');
    }
  };

  render() {
    const {isSelected, title, onPress} = this.props;
    return (
      <TouchableOpacity style={{flex: 1}} onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            marginVertical: 8,
          }}>
          <Image
            source={this.getSource(isSelected)}
            style={{height: 22, width: 22}}
            resizeMode="center"
          />
          <Text
            style={[
              globalStyleCss.text,
              {
                fontSize: 14,
                marginLeft: 8,
                flexShrink: 1,
                flex: 1,
              },
            ]}
            numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
