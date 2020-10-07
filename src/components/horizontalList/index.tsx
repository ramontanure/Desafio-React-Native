import React from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";
import globalStyleCss, { COLOR } from "../../util/global-style.css";
import style from "./style.css";
import { Grupo } from "../../redux/dataset/types";

interface Props {
	selectedIndex: number;
	lista: any[];
	itemLista: string;
	onPress(item: Grupo, index: number): void;
	listRef(ref: FlatList<any>): void;
}
export default class HorizontalList extends React.Component<Props> {
	render() {
		let { selectedIndex, lista, itemLista, listRef, onPress } = this.props;
		return (
			<FlatList
				style={style.lista}
				ref={listRef}
				initialNumToRender={4}
				data={lista}
				keyExtractor={item => item.nome}
				horizontal
				extraData={this.props}
				renderItem={({ item, index }) => {
					return (
						<TouchableOpacity
							onPress={() => onPress(item, index)}
							style={[
								globalStyleCss.center,
								style.item,
								{
									borderBottomColor:
										selectedIndex == index ? COLOR.BASE : "#f9faf9",
									marginRight: index != lista.length - 1 ? 16 : 0
								}
							]}
						>
							<Text
								style={[
									globalStyleCss.text,
									style.itemText,
									{
										color: selectedIndex == index ? COLOR.BASE : "#333"
									}
								]}
							>
								{item[itemLista]}
							</Text>
						</TouchableOpacity>
					);
				}}
			/>
		);
	}
}
