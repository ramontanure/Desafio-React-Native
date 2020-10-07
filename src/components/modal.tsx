import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import globalStyleCss, {COLOR} from '../util/global-style.css';
import {Button, Icon} from '.';

type ModalProps = {
  visible: Boolean;
  centerItems?: boolean;
  closeAction?(): void;
  closeActionName?: string;
  confirmName?: string;
  title?: any;
  confirm?(): void;
  subtitle?: any;
  children?: JSX.Element[] | JSX.Element | any;
};

const DEVICE_HEIGHT = Dimensions.get('screen').height;

const PopUp = ({
  children,
  visible = false,
  closeAction,
  confirmName,
  confirm,
  closeActionName,
  title,
  subtitle,
}: ModalProps): JSX.Element => {
  const getTitle = (title: any) => {
    if (title != undefined) {
      if (typeof title === 'string') {
        return (
          <Text style={[globalStyleCss.textTitle, {fontSize: 20}]}>
            {title}
          </Text>
        );
      } else {
        return title;
      }
    }
  };
  if (visible)
    return (
      <Modal transparent={true}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            position: 'absolute',
            width: Dimensions.get('window').width,
            zIndex: 9999,
            height: '100%',
          }}>
          <View
            style={[
              {
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: 16,
              },
            ]}>
            <View
              style={{
                borderRadius: 8,
                backgroundColor: 'white',
                padding: 32,
                paddingBottom: confirm ? 12 : 20,
                elevation: 1,
                maxHeight: '90%',
                width: '100%',
              }}>
              <View>{getTitle(title)}</View>

              <ScrollView style={{flexGrow: 0, paddingTop: 16}}>
                {subtitle && (
                  <Text
                    style={[
                      globalStyleCss.textTitle,
                      {fontSize: 14, fontWeight: 'bold'},
                    ]}>
                    {subtitle}
                  </Text>
                )}
                {children}
              </ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  paddingTop: 16,
                }}>
                {closeAction && (
                  <Button
                    style={{
                      backgroundColor: 'white',
                      borderWidth: 0,
                    }}
                    textColor={COLOR.BASE}
                    title={closeActionName || 'Cancelar'}
                    onPress={closeAction}
                  />
                )}
                {confirm && (
                  <Button
                    style={{backgroundColor: 'white', borderWidth: 0}}
                    textColor={COLOR.BASE}
                    title={confirmName || 'Confirmar'}
                    onPress={confirm}
                  />
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  else return <View />;
};

export default PopUp;

const blank = () => {};
