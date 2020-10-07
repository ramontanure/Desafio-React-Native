import React from "react";
import PopUp from "./modal";
import globalStyleCss, { COLOR } from "../util/global-style.css";
import InputMask from "./text-input-mask";
import { View, Text } from "react-native";
import { moneyToNumber } from "../util/helpers";

interface Props {
	onPress(text: number): void;
}

interface State {
	valor: string;
	visible: boolean;
}

export default class Valor extends React.Component<Props> {
	state: State = {
		valor: "0,00",
		visible: false
	};

	open = (valor: number) =>
		this.setState({ visible: true, valor: `R$${valor.toFixed(2)}` });

	handleText = (text: string) => {
		this.setState({
			text
		});
	};

	onPress = () => {
		this.props.onPress(moneyToNumber(this.state.valor));
		this.setState({ visible: false });
	};

	render() {
		let { visible } = this.state;
		return (
			<PopUp
				title="Informe o valor"
				visible={visible}
				confirm={this.onPress}
				closeAction={() => this.setState({ visible: false })}
			>
				<View style={{ marginVertical: 16, width: "100%" }}>
					<InputMask
						style={[globalStyleCss.inputTextPopup, { width: "50%" }]}
						value={this.state.valor}
						onSubmitEditing={this.onPress}
						onChangeText={(valor: string) => this.setState({ valor })}
						autoFocus
					/>
				</View>
			</PopUp>
		);
	}
}
