import React, {Component} from 'react';
import {Text, TextInput, View} from 'react-native';
import {styles} from '../components/styles';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{...styles.header, padding: -10, paddingHorizontal: 10}}>
          <TextInput
            placeholder="cari sesuatu..."
            onChangeText={input => this.setState({search: input})}
            onEndEditing={() => console.log(this.state.search)}
            selectTextOnFocus
            blurOnSubmit
            autoFocus
          />
        </View>
        <View style={{padding: 10}}>
          <Text> Pencarian untuk: {this.state.search} </Text>
        </View>
      </View>
    );
  }
}
