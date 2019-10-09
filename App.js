import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
 import OrgaosScreen from './components/Orgaos'
import HomeScreen from './components/Home'
import OrgaoScreen from './components/Orgao'
import PessoaScreen from './components/Pessoa'
 

/**
 * comando
 * emulator -list-avds
 * emulator -avd <nome dispositivo>
 * react-native start
 * react-native run-android
 */

 const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Orgaos: {screen: OrgaosScreen},
  Orgao: {screen: OrgaoScreen},
  Pessoa: {screen: PessoaScreen},
});

const App = createAppContainer(MainNavigator);
export default App;