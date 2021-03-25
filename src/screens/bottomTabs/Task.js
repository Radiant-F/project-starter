import React, {Component} from 'react';
import {Text, View, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../../components/styles';

export default class Task extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.titleHeader}>Papan</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate('Pencarian')}>
              <Icon name="magnify" size={30} style={{marginRight: 20}} />
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => console.log('pressed')}>
              <Icon name="cog" size={30} />
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={{padding: 5, flex: 1}}>
          <Text> Projek </Text>
        </View>
      </View>
    );
  }
}
