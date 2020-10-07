import React from "react";
import PrinterService from "../services/gertec/printer/PrinterService";
import { View } from "react-native";
import { Print } from "../redux/ui/types";
import { getPrintObj } from "../util/helpers";

interface Props {
	openConfirmation(title: string, message?: string, a?: any, b?: any): void;
	addPrint(print: Print[] | Print, onPrintEnd?: Function): void;
}

interface State {
	visible: boolean;
	text: string;
}

export default class ImpressaoVirtual extends React.Component<Props> {
	state: State = {
		visible: false,
		text: ""
	};

	openModal = (text: string, onPressImprimir?: any, onCancel?: any) => {
		this.setState({ text });
		this.props.openConfirmation(
			"Impressão Virtual",
			text,
			() => {
				this.props.addPrint(getPrintObj(this.state.text, "TEXT"));
			},
			onCancel
		);
	};

	closeModal = () => {
		this.setState({ visible: false });
	};

	render() {
		return <View />;
	}
}
