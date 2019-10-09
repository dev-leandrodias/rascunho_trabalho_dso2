import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Portal transparencia DSO2',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          title="Acesse"
          onPress={() => navigate('Orgaos')}
        />
      </View>
    );
  }
}