import React from 'react';
// @ts-ignore
import Kebab, {MenuItem} from 'react-native-material-menu';
import {ActionSheetIOS, View, Text} from 'react-native';
import {Icon} from '.';
import globalStyleCss from '../util/global-style.css';

interface Action {
  onPress: Function;
  name: string;
}

interface Props {
  actions: Action[];
}

export default class KebabMenu extends React.Component<Props> {
  onPressItem = (action: Action) => {
    //@ts-ignore
    this.KebabRef.hide();
    action.onPress();
  };

  openKebab = () => {
    //@ts-ignore
    this.KebabRef.show();
  };

  KebabRef = null;
  render() {
    return (
      <View>
        <Icon
          source={require('./../assets/kebab.png')}
          onPress={this.openKebab}
        />
        <Kebab
          button={<></>}
          animationDuration={0}
          ref={(ref: any) => (this.KebabRef = ref)}>
          {this.props.actions.map((action: Action, index: number) => {
            return (
              <MenuItem key={index} onPress={() => this.onPressItem(action)}>
                <Text style={[globalStyleCss.text]}>{action.name}</Text>
              </MenuItem>
            );
          })}
        </Kebab>
      </View>
    );
  }
}
