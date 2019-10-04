import * as React from 'react';
import { Text, View, StyleSheet, Button, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class PessoaScreen extends React.Component {
  static navigationOptions = {
    title: 'Portal transparencia DSO2',
  };
  constructor(props) {
    super(props);
    let pessoa = props.navigation.getParam('pessoa');
    this.state = {
      pessoa: pessoa
    };
  }

  static pessoaInit = {
    id: null,
    dimViagem: {
      id: null,
      motivo: null,
      pcdp: null,
      ano: null
    },
    situacao: null,
    pessoa: {
      numeroInscricaoSocial: null,
      nome: null,
      razaoSocialReceita: null,
      nomeFantasiaReceita: null,
      cnae: null,
      municipio: {
        codigoIBGE: null,
        nomeIBGE: null,
        pais: null,
        uf: {
          sigla: null,
          nome: null
        }
      },
      localidadePessoa: null,
      naturezaJuridica: {
        codigo: null,
        descricao: null,
        codigoTipo: null,
        descricaoTipo: null
      },
      dataAbertura: null,
      enderecoEletronico: null,
      numeroTelefone: null,
      descricaoLogradouro: null,
      numeroEndereco: null,
      complementoEndereco: null,
      numeroCEP: null,
      nomeBairro: null,
      codigoFormatado: null,
      tipoCodigo: null,
      tipoPessoa: null
    },
    beneficiario: null,
    cargo: null,
    tipoViagem: {
      id: null,
      descricao: null
    },
    orgao: null,
    orgaoPagamento: null,
    unidadeGestoraResponsavel: {
      codigo: null,
      nome: null,
      descricaoPoder: null,
      orgaoVinculado: {
        codigoSIAFI: null,
        cnpj: null,
        sigla: null,
        nome: null
      },
      orgaoMaximo: {
        codigo: null,
        sigla: null,
        nome: null
      }
    },
    dataInicioAfastamento: null,
    dataFimAfastamento: null,
    valorTotalRestituicao: 0.00,
    valorTotalTaxaAgenciamento: 0.00,
    valorMulta: 0.00,
    valorTotalDiarias: 0.00,
    valorTotalPassagem: 0.00,
    valorTotalViagem: 0.00,
    valorTotalDevolucao: 0.00
  };

  render() {
    const { pessoa } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button title="Voltar" onPress={() => navigate('Aluno')} />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.padis}>
              <Text style={styles.item}>Dias que o funcionario ficou afastado</Text>
              <Text style={styles.item}>De: {pessoa.dataInicioAfastamento} ate {pessoa.dataFimAfastamento}</Text>
              <Text style={styles.item}>Nome do funcionario</Text>
              <Text style={styles.item}>{pessoa.pessoa.nome}</Text>
              <Text style={styles.item}>Motivo da viagem</Text>
              <Text numberOfLines={100} style={styles.item}>{pessoa.dimViagem.motivo}</Text>
              <Text style={styles.item}>Valor Ageciado para viagem</Text>
              <Text style={styles.item}>{pessoa.valorTotalTaxaAgenciamento}</Text>
              <Text style={styles.item}>Valor da multa</Text>
              <Text style={styles.item}>{pessoa.valorMulta}</Text>
              <Text style={styles.item}>Valor total pago em diaria</Text>
              <Text style={styles.item}>{pessoa.valorTotalDiarias}</Text>
              <Text style={styles.item}>Valor total da passagem</Text>
              <Text style={styles.item}>{pessoa.valorTotalPassagem}</Text>
              <Text style={styles.item}>Valor total da viagem</Text>
              <Text style={styles.item}>{pessoa.valorTotalViagem}</Text>
              <Text style={styles.item}>Valor restituido da viagem</Text>
              <Text style={styles.item}>{pessoa.valorTotalDevolucao}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 22,
    paddingBottom:40,
    width:400

  },
  padis: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  item: {
    padding: 10,
    fontSize: 18,
    width: 300,
    flex:1,
    
    
  },
});