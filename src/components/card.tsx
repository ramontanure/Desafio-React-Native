import React from 'react';
import {Dimensions, Image, View, Text, TouchableOpacity} from 'react-native';
import {NO_IMAGE} from '../util/constants';
import globalStyleCss from '../util/global-style.css';
import styles from '../containers/gerenciamentoDeMesa/style.css';

interface Props {
  title: string;
  onPress: any;
  image?: any;
  subtitle?: string;
  isOpaque?: boolean;
  border?: string;
  isMesa?: boolean;
  agrupamento?: string;
  onLongPress?: any;
  getColor?: any;
}

export default class Card extends React.Component<Props> {
  render() {
    const {
      title,
      onPress,
      image,
      subtitle,
      isOpaque,
      isMesa,
      agrupamento,
      onLongPress,
      getColor,
    } = this.props;
    return (
      <TouchableOpacity
        style={
          isMesa
            ? [
                styles.mesaButton,
                {
                  flex: 1 / 2,
                  borderRadius: 16,
                  margin: 8,
                  elevation: 3,
                  backgroundColor: getColor(),
                },
              ]
            : [
                {
                  margin: 8,
                  borderRadius: 16,
                  elevation: 3,
                  flex: 1 / 2,
                  backgroundColor: 'white',
                  opacity: isOpaque ? 0.5 : 1,
                },
              ]
        }
        onLongPress={onLongPress}
        onPress={onPress}>
        {image && (
          <Image
            style={{
              height: Dimensions.get('screen').height * 0.15,
              borderRadius: 16,
            }}
            source={{uri: image}}
            resizeMode="contain"
          />
        )}
        <View
          style={{
            flex: 1,
            padding: isMesa ? 0 : 12,
            justifyContent: 'center',
          }}>
          <Text
            style={
              isMesa
                ? [styles.mesaNumero]
                : [globalStyleCss.text, {paddingBottom: 4, textAlign: 'center'}]
            }>
            {title}
          </Text>
          {subtitle && (
            <Text
              numberOfLines={1}
              style={isMesa ? [styles.mesaButtonText] : [globalStyleCss.text]}>
              {subtitle}
            </Text>
          )}
          {agrupamento && (
            <Text
              numberOfLines={1}
              style={isMesa ? [styles.mesaButtonText] : [globalStyleCss.text]}>
              {agrupamento}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
