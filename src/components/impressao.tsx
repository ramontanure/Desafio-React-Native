import React from 'react';
import {View, Text} from 'react-native';
import PrinterService from '../services/gertec/printer/PrinterService';
import {Print, ImpressaoT} from '../redux/ui/types';
import PopUp from './modal';
import globalStyleCss from '../util/global-style.css';
import {printBlankLinesCommand} from '../util/helpers';

export interface ImpressaoProps {
  IDMODEIMPRES: string;
  removePrint(): void;
  impressao: ImpressaoT;
  openConfirmation(title: string, message?: string, a?: any, b?: any): void;
}

export interface ImpressaoState {}

export default class Impressao extends React.Component<
  ImpressaoProps,
  ImpressaoState
> {
  state: ImpressaoState = {};

  recursivePrints = (currentPrint: number) => {
    const {prints} = this.props.impressao;
    const print = prints[currentPrint];
    if (print.isOpcional) {
      this.props.openConfirmation(
        'Aviso',
        print.isOpcionalText || '',
        () => this.print(print, currentPrint),
        () => this.checkNextPrint(currentPrint),
      );
    } else this.print(print, currentPrint);
  };

  print = (print: Print, currentPrint: number) => {
    if (print.type == 'QR') {
      PrinterService.printQrCode(
        this.props.IDMODEIMPRES,
        print.text,
        (obj: any) => this.onPrinterResponse(obj, currentPrint),
      );
    } else {
      if (print.isNotLast == undefined || !print.isNotLast)
        print.text = this.verifyLastPrint(currentPrint, print.text);
      PrinterService.printText(
        this.props.IDMODEIMPRES,
        print.text,
        print.isBold,
        print.fontSize,
        (obj: any) => this.onPrinterResponse(obj, currentPrint),
      );
    }
  };

  verifyLastPrint(currentPrint: number, text: string) {
    if (
      this.props.impressao.prints.length - 1 == currentPrint ||
      this.props.impressao.prints[currentPrint + 1].isOpcional
    ) {
      text = '\n\r' + text.trim();
      text += printBlankLinesCommand();
    }
    return text;
  }

  checkNextPrint = (currentPrint: number) => {
    const {prints} = this.props.impressao;
    if (prints.length - 1 > currentPrint) {
      this.recursivePrints(currentPrint + 1);
    } else {
      this.goBack();
    }
  };

  onPrinterResponse = ({error, data, message}: any, currentPrint: number) => {
    if (!error) {
      this.checkNextPrint(currentPrint);
    } else {
      this.props.openConfirmation(
        `Ops, ${message} `,
        'Deseja tentar imprimir novamente?',
        () => {
          if (
            message == 'Impressora sem papel.' &&
            this.props.impressao.prints[currentPrint - 1]
          ) {
            this.recursivePrints(currentPrint - 1);
          } else {
            this.recursivePrints(currentPrint);
          }
        },
        this.goBack,
      );
    }
  };

  goBack = () => {
    // action s
    // this.props.navigation.goBack();
    this.props.impressao.onPrintEnd && this.props.impressao.onPrintEnd();
    this.props.removePrint();
  };

  componentDidUpdate() {
    const {prints, visible} = this.props.impressao;
    if (visible)
      if (prints.length > 0) {
        this.recursivePrints(0);
      }
  }

  shouldComponentUpdate(nextProps: ImpressaoProps) {
    return this.props.impressao.visible != nextProps.impressao.visible;
  }

  render() {
    const {visible} = this.props.impressao;
    if (visible)
      return (
        <PopUp title="Aguarde a impressão" visible={visible}>
          <Text style={[globalStyleCss.text]}>Aguarde a impressão</Text>
        </PopUp>
      );
    else return <></>;
  }
}
