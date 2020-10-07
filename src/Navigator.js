import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './Pages/Login'
import Cardapio from './Pages/Cardapio'

     
class Navegacao extends Component {
    
    render() {
        
        const AuthStack = createStackNavigator();

        return (
           <NavigationContainer screenOptions={{ headerShown: true }}>
            <AuthStack.Navigator>
               <AuthStack.Screen name="Login" component={Login} />
               <AuthStack.Screen name="Cardapio" component={Cardapio} />
           </AuthStack.Navigator>
           </NavigationContainer> 
           )
    }
        
    }

    export default Navegacao
