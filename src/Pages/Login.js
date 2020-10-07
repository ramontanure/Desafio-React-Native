import React, { Component } from 'react'
import { connect } from 'react-redux'

import { View, Image, StyleSheet }from 'react-native'

import { login } from '../Store/actions/user'
import { getCardapio } from '../Store/actions/cardapio'
import { login as authApi } from '../api/login.ts'

import TextInput from '../components/text-input.tsx'
import Button from '../components/button/index.tsx'
import Logo from '../assets/odhen_pos.png'



class Login extends Component { 
    state = {
        operador: '999',
        senha: '1',
        cardapio: null,
    }

    handleSubmit = () => {
        const {operador, senha} = this.state

        this.props.onLogin({ operador, senha })

        this.props.navigation.navigate('Cardapio')

        authApi(operador,senha).then((response) => {
            const cardapio = response.dataset.ParamsGroupRepository
            
            this.props.setCardapio(cardapio)
            
        }).catch()
    }

    render() {

        return(
            <>
            <View>
            <Image style={styles.logo} source={Logo} />
            <TextInput style={styles.input} placeholder='Digite seu Email' keyboardType="email-address" 
            value={this.state.operador} onChangeText={(operador) => this.setState({ operador })}>
            </TextInput>
            <TextInput style={styles.input} placeholder='Digite sua senha' secureTextEntry
            value={this.state.senha} onChangeText={ ( senha ) => this.setState({ senha })}>
            </TextInput>
            <Button style={styles.button} title='Avançar' onPress={this.handleSubmit} />  
            </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        height: 145,
        width: 350,
        marginTop: 80,
        marginBottom: 60,
        justifyContent: 'center', 
    },
    input: {
        margin: 8,
        justifyContent: 'center',
    },
    button: {
        margin: 8,
    }
})

const mapDispatchToProps = dispatch => {
    return { 
       onLogin: user => dispatch(login({user})),
       setCardapio: cardapio => dispatch(getCardapio({ cardapio })),
    }
}

export default connect(null, mapDispatchToProps)(Login)
