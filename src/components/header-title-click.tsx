import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import globalStyleCss from '../util/global-style.css';
import Icon from './icon';
import {capitalize} from 'lodash';

type TitleClickProps = {
  title: string;
  onPress?: any;
};

export default function TitleClick({
  title,
  onPress,
}: TitleClickProps): JSX.Element {
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          onPress={onPress}
          style={[
            globalStyleCss.textTitle,
            {fontFamily: 'OpenSans', textAlign: 'center'},
          ]}>
          {capitalize(title)}
        </Text>
        <Icon
          style={{right: 8}}
          source={require('../assets/arrow-down.png')}
          onPress={onPress}
        />
      </TouchableOpacity>
    </>
  );
}
