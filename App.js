import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
 import AlunosScreen from './components/Alunos'
import HomeScreen from './components/Home'
import AlunoScreen from './components/Aluno'
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
  Alunos: {screen: AlunosScreen},
  Aluno: {screen: AlunoScreen},
  Pessoa: {screen: PessoaScreen},
});

const App = createAppContainer(MainNavigator);
export default App;