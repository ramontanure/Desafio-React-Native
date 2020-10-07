import React from 'react';
import PopUp from './modal';
import {View, Text, Dimensions, ScrollView, Web} from 'react-native';
import globalStyleCss, {COLOR} from '../util/global-style.css';

interface Props {
  visible: boolean;
  onPress: any;
  title: string;
  text?: string;
  onCancel?: any;
  closable: boolean;
  closeAction: any;
  actionName?: string;
}

export default class Confirmation extends React.Component<Props> {
  confirm = () => {
    this.props.onPress();
    this.props.closeAction();
  };

  cancel = () => {
    this.props.onCancel();
    this.props.closeAction();
  };

  render() {
    if (this.props.visible) {
      let {
        text,
        visible,
        title,
        onCancel,
        onPress,
        closeAction,
        actionName,
      } = this.props;
      return (
        <PopUp
          title={title}
          visible={visible}
          closeAction={onCancel ? this.cancel : closeAction}
          closeActionName={onCancel ? 'Cancelar' : 'OK'}
          confirmName={actionName}
          confirm={onPress ? this.confirm : undefined}>
          <ScrollView style={{flexGrow: 0}}>
            <Text
              style={[
                globalStyleCss.textTitle,
                {fontSize: 12, fontFamily: 'OpenSans'},
              ]}>
              {typeof text == 'string' ? text.trim() : JSON.stringify(text)}
            </Text>
          </ScrollView>
        </PopUp>
      );
    } else return <></>;
  }
}
