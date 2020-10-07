/**
 * @format
 */
import React from 'react'; 
import { Provider } from 'react-redux' 
import {AppRegistry} from 'react-native';
import Navegacao from './src/Navigator'
import {name as appName} from './app.json';

import storeConfig from './src/Store/storeConfig'

const store = storeConfig()

const Redux = () => (
    <Provider store={store}> 
     <Navegacao />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);