import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from 'react-native';
import moment from "moment"

import DateTimePicker from "react-native-modal-datetime-picker";
import axios from "axios";
export default class AlunoScreen extends React.Component {
  static navigationOptions = {
    title: 'Cadastro de Aluno',
  };

  constructor(props) {
    super(props);
    let codigo = props.navigation.getParam('codigo');
    this.state = {
      isLoading: false,
      codigo: codigo,
      pessoas: [{ pessoa: { nome: '' } }],
      isDateTimePickerInicialVisible: false,
      isDateTimePickerFinalVisible: false,
      dataInicial: moment().format('DD/MM/YYYY'),
      dataFinal: moment().format('DD/MM/YYYY'),
      pagina: 1

    };
  }

  showDateTimePickerInicial = () => {
    this.setState({ isDateTimePickerInicialVisible: true });
  };

  hideDateTimePickerInicial = () => {
    this.setState({ isDateTimePickerInicialVisible: false });

  };

  handleDatePickedInicial = date => {
    let dataIni = moment(date).format('DD/MM/YYYY')
    this.setState({
      dataInicial: dataIni
    })
    this.hideDateTimePickerInicial();
  };

  showDateTimePickerFinal = () => {
    this.setState({ isDateTimePickerFinalVisible: true });
  };

  hideDateTimePickerFinal = () => {
    this.setState({ isDateTimePickerFinalVisible: false });
  };

  handleDatePickedFinal = date => {
    let dateFim = moment(date).format('DD/MM/YYYY')
    this.setState({
      dataFinal: dateFim
    })
    this.hideDateTimePickerFinal();
  };




  handleSeach() {
    const { codigo, dataInicial, dataFinal } = this.state;
    console.log(this.state)
    console.log(codigo, dataInicial, dataFinal)
    axios.get('http://www.transparencia.gov.br/api-de-dados/viagens', {
      params: {
        dataIdaDe: dataInicial,
        dataIdaAte: dataFinal,
        dataRetornoDe: dataInicial,
        dataRetornoAte: dataFinal,
        codigoOrgao: codigo,
        pagina: 1
      }
    }).then((res, req) => {
      console.log(res)
      this.setState({
        isLoading: false,
        // alunos: responseJson,
        pessoas: res.data,
        pagina: 1
      })
    }).catch((error) => {
      console.log(error)
      this.setState({
        isLoading: false,
        // alunos: responseJson,
        pessoas: [{ pessoa: { nome: '' } }],
      });
    });
    this.setState({
      isLoading: true,
      // alunos: responseJson,
      pessoas: [{ pessoa: { nome: '' } }],
    })


  }

  handleNextPage() {
    const { codigo, dataInicial, dataFinal,pagina } = this.state;
    let pag = pagina;
    let pageInit = pagina;
    pag++;
    axios.get('http://www.transparencia.gov.br/api-de-dados/viagens', {
      params: {
        dataIdaDe: dataInicial,
        dataIdaAte: dataFinal,
        dataRetornoDe: dataInicial,
        dataRetornoAte: dataFinal,
        codigoOrgao: codigo,
        pagina: pag
      }
    }).then((res, req) => {
      console.log(res)
      this.setState({
        isLoading: false,
        // alunos: responseJson,
        pessoas: res.data,
        pagina: pagina
      })
    }).catch((error) => {
      console.log(error)
  
      this.setState({
        isLoading: false,
        // alunos: responseJson,
        pagina:pageInit,
        pessoas: [{ pessoa: { nome: '' } }],
      });
    });
    this.setState({
      isLoading: true,
      // alunos: responseJson,
      pessoas: [{ pessoa: { nome: '' } }],
    })


  }


  handleLastPage() {
    const { codigo, dataInicial, dataFinal,pagina } = this.state;
    let pag = pagina;
    let pageInit = pagina;
    if (pag >= 2) {
      pag--;
    }
    axios.get('http://www.transparencia.gov.br/api-de-dados/viagens', {
      params: {
        dataIdaDe: dataInicial,
        dataIdaAte: dataInicial,
        dataRetornoDe: dataFinal,
        dataRetornoAte: dataFinal,
        codigoOrgao: codigo,
        pagina: pagina
      }
    }).then((res, req) => {
      console.log(res)
      this.setState({
        isLoading: false,
        // alunos: responseJson,
        pessoas: res.data,
        pagina: pagina
      })
    }).catch((error) => {
      console.log(error)
      this.setState({
        isLoading: false,
        // alunos: responseJson,,
        pagina:pageInit,
        pessoas: [{ pessoa: { nome: '' } }],
      });
    });
    this.setState({
      isLoading: true,
      // alunos: responseJson,
      pessoas: [{ pessoa: { nome: '' } }],
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
    const { navigate } = this.props.navigation;
    const { codigo, dataInicial, dataFinal } = this.state;
    return (
      <View style={styles.container}>
        <Button title="Voltar" onPress={() => navigate('Alunos')} />
        <Text>{dataInicial}</Text>

        <Button title="data inicial da pesquisa" onPress={this.showDateTimePickerInicial} />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerInicialVisible}
          onConfirm={this.handleDatePickedInicial}
          onCancel={this.hideDateTimePickerFinal}
          mode={"date"}
        />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerFinalVisible}
          onConfirm={this.handleDatePickedFinal}
          onCancel={this.hideDateTimePickerFinal}
          mode={"date"}
        />
        <Text>{dataFinal}</Text>
        <Button title="data final da pesquisa" onPress={this.showDateTimePickerFinal} />
        <Button title="Busca" onPress={() => this.handleSeach()} />

        <FlatList
          data={this.state.pessoas}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => {
              navigate('Pessoa', {'pessoa': item})
            }}>
              <View>
                <Text style={styles.item}> {item.pessoa.nome}</Text>
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
    width:390

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
  
});