import * as React from 'react';
import { TextInput, Text, View, StyleSheet, Button, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios'
export default class AlunosScreen extends React.Component {
  static navigationOptions = {
    title: 'Listagem de Orgons',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: '',
      orgao: [],
      pagina: 1,
      msg: 'sem registros'

    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      return this.handleSeach()
    });
  }

  initCompoment() {
    this.setState({
      isLoading: true,
      text: '',
      orgao: [{
      }],
      pagina: 1,
      msg: 'sem registros'

    });

  }

  componentWillUnmount() {
    this.focusListener.remove();
    this.setState({
      isLoading: true,
      text: '',
      orgao: [{
      }],
      pagina: 1
    }, function () {
    })
  }
  handleSeach() {
    const { text, pagina } = this.state;
    axios.get('http://www.transparencia.gov.br/api-de-dados/orgaos-siafi', {
      params: {
        descricao: this.state.text,
        pagina: pagina
      }
    }).then((res, req) => {
      this.setState({
        isLoading: false,
        // alunos: responseJson,
        orgao: res.data,
        pagina: 1
      })
      console.log(this.state.orgao.length)
      console.log(!this.state.isLoading && !this.state.orgao.length)

    }).catch((error) => {
      this.setState({
        isLoading: false,
        // alunos: responseJson,
        orgao: [{}]
      })
    });
    this.setState({
      isLoading: true,
      // alunos: responseJson,
      orgao: [{}]
    })


  }

  handleNextPage() {
    const { text, pagina } = this.state;
    let pag = pagina;
    let pageInit = pagina;

    pag++
    console.log(pag)
    axios.get('http://www.transparencia.gov.br/api-de-dados/orgaos-siafi', {
      params: {
        descricao: text,
        pagina: pag
      }
    }).then((res, req) => {
      console.log(res)
      console.log(req)
      this.setState({
        isLoading: false,
        orgao: res.data,
        pagina: pag
      })
      console.log(this.state)
    }).catch((error) => {

      this.setState({
        isLoading: false,
        // alunos: responseJson,
        pagina: pageInit,
        orgao: [{}]
      })
    });
    this.setState({
      isLoading: true,
      // alunos: responseJson,
      orgao: [{}]
    })
  }


  handleLastPage() {
    const { text, pagina } = this.state;
    let pageInit = pagina;
    let pag = pagina;
    if (pag >= 2) {
      pag--;
    }
    axios.get('http://www.transparencia.gov.br/api-de-dados/orgaos-siafi', {
      params: {
        descricao: text,
        pagina: pag
      }
    }).then((res, req) => {
      console.log(res)
      this.setState({
        isLoading: false,
        // alunos: responseJson,
        orgao: res.data,
        pagina: pag
      })
    }).catch((error) => {
      this.setState({
        isLoading: true,
        // alunos: responseJson,
        pagina: pageInit,
        orgao: [{}]
      })
    });

    this.setState({
      isLoading: true,
      // alunos: responseJson,
      orgao: [{}]
    })
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    if (!this.state.isLoading && this.state.orgao.length == 0 && !this.state.pagina == 1) {
      return (
        <View style={styles.container}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Informe o nome do Orgão desejado"
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
          <Button
            title="Buscar"
            onPress={() => this.handleSeach()}
          />
          <Text>{this.state.msg}</Text>
        </View>
      );
    }

    if (!this.state.isLoading && this.state.orgao.length == 0 && this.state.pagina > 1) {
      return (
        <View style={styles.container}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Informe o nome do Orgão desejado"
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
          <Button
            title="Buscar"
            onPress={() => this.handleSeach()}
          />
          <Text>{this.state.msg}</Text>
          <View style={styles.containerFooter}>
            <View style={styles.button}>
              <Button
                title="aterior"
                onPress={() => this.handleLastPage()}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Proxima"
                onPress={() => this.handleNextPage()}
              />
            </View>
          </View>
        </View>
      );
    }

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Informe o nome do Orgão desejado"
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />

        <Button
          title="Buscar"
          onPress={() => this.handleSeach()}
        />

        <FlatList
          style={{ paddingBottom: 41 }}
          data={this.state.orgao}
          keyExtractor={item => item.codigo}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => {
              this.initCompoment();
              navigate('Aluno', { codigo: item.codigo })
            }}

            >
              <View  >
                <Text numberOfLines={3} style={styles.item} > {item.codigoDescricaoFormatado}</Text>
              </View>
            </TouchableOpacity>}
        />
        <View style={styles.containerFooter}>
          <View style={styles.button}>
            <Button
              title="aterior"
              onPress={() => this.handleLastPage()}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Proxima"
              onPress={() => this.handleNextPage()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    paddingBottom: 40,
    width: 400,
  },
  item: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    height: 44,
    width: 388,

  },

  containerFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: 'green',
    width: '40%',
    height: 40
  }
})