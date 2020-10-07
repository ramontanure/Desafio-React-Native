import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import globalStyleCss, {COLOR} from '../util/global-style.css';
import {TabRouter} from 'react-navigation';

interface QuantidadeProps {
  value: number;
  minusPress: any;
  plusPress: any;
  minValue?: number;
  borderless?: boolean;
}

const Quantidade: React.SFC<QuantidadeProps> = ({
  value,
  minusPress = 0,
  plusPress,
  minValue,
  borderless = false,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#333',
        borderWidth: borderless ? 0 : 1,
        height: 48,
        borderRadius: 30,
        padding: 8,
        backgroundColor: '#fafafa',
      }}>
      <TouchableOpacity
        style={{
          paddingHorizontal: 16,
          height: '100%',
          justifyContent: 'center',
        }}
        onPress={() => {
          if (!minValue) minusPress();
          else if (value > minValue) minusPress();
        }}>
        <Text
          style={[
            globalStyleCss.text,
            {fontSize: 24, fontFamily: 'OpenSans-Bold'},
          ]}>
          -
        </Text>
      </TouchableOpacity>
      <View style={{alignItems: 'center', paddingHorizontal: 16}}>
        <Text
          style={[
            globalStyleCss.text,
            {fontSize: 18, fontFamily: 'OpenSans-Bold'},
          ]}>
          {value}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          paddingHorizontal: 16,
          height: '100%',
          justifyContent: 'center',
        }}
        onPress={plusPress}>
        <Text
          style={[
            globalStyleCss.text,
            {fontSize: 24, fontFamily: 'OpenSans-Bold'},
          ]}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Quantidade;
