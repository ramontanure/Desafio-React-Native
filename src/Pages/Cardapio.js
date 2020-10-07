import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, FlatList, StyleSheet } from 'react-native'

class Cardapio extends Component {
  render() {
    const {state} = this.props;
    const {cardapio} = state.cardapio;

    return (
      <>
        <View style={styles.container}>
          <FlatList
            data={cardapio}
            renderItem={({item}) => (
              <Text key={item.NMGRUPO} style={styles.itemGroup}>
                {item.NMGRUPO}
              </Text>
            )}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4343'
  },
  itemGroup: {
    backgroundColor: '#855',
    flex: 1,
    padding: 20,
    color: 'white',
    borderBottomWidth: 1,
   
    
  }


})

const mapStateToProps = (state) => {
  return {
    state,
  }
}

export default connect(mapStateToProps, null)(Cardapio);