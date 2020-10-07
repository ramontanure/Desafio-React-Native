import React from 'react';
import PopUp from './modal';
import globalStyleCss from '../util/global-style.css';
import {View, KeyboardType} from 'react-native';
import InputText from './text-input';
import InputMask from './text-input-mask';
import {tsThisType} from '@babel/types';

interface Props {
  keyboardType?: KeyboardType | 'money';
  placeholder?: string;
  isPassword?: boolean;
  confirmName?: string;
  visible: boolean;
  startupValue?: string;
  onConfirm: (text: string) => void;
  closeInputModal: () => void;
  title: string;
}

interface State {
  text: string;
  error: boolean;
  errorMessage: string;
  initialized: boolean;
}

const INITIAL_STATE: State = {
  text: '',
  error: false,
  errorMessage: '',
  initialized: false,
};

export default class InputModal extends React.Component<Props, State> {
  state: State = INITIAL_STATE;

  onConfirm = () => {
    this.props.closeInputModal();
    this.props.onConfirm(this.state.text);
    this.setState(INITIAL_STATE);
  };

  onClose = () => {
    this.setState(INITIAL_STATE);
    this.props.closeInputModal();
  };

  componentDidUpdate() {
    if (this.props.keyboardType == 'money' && !this.state.text) {
      this.setState({
        text: Number(this.props.startupValue).toFixed(2) || '',
      });
    } else if (
      !this.state.text &&
      this.props.startupValue &&
      !this.state.initialized
    ) {
      this.setState({
        initialized: true,
        text: this.props.startupValue,
      });
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      this.props.visible != nextProps.visible ||
      nextState.text != this.state.text ||
      nextProps.title != this.props.title
    );
  }

  render() {
    if (this.props.visible) {
      const {visible, title, confirmName} = this.props;
      return (
        <PopUp
          closeAction={this.onClose}
          visible={visible}
          confirmName={!this.state.text ? confirmName : 'Confirmar'}
          confirm={this.onConfirm}
          title={title}>
          <View style={{width: '100%'}}>
            {this.props.keyboardType == 'money' ? (
              <InputMask
                autoFocus
                secureTextEntry={this.props.isPassword}
                style={[globalStyleCss.inputTextPopup]}
                value={this.state.text}
                onChangeText={(text: string) => {
                  this.setState({error: false, text});
                }}
                onSubmitEditing={this.onConfirm}
              />
            ) : (
              <InputText
                autoFocus
                secureTextEntry={this.props.isPassword}
                placeholder={this.props.placeholder}
                onSubmitEditing={this.onConfirm}
                onChangeText={text => {
                  this.setState({error: false, text});
                }}
                keyboardType={this.props.keyboardType || 'default'}
                error={this.state.error}
                value={this.state.text}
                errorMessage={this.state.errorMessage}
              />
            )}
          </View>
        </PopUp>
      );
    } else return <></>;
  }
}
