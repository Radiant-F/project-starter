import React, {Component} from 'react';
import {Text, View, TouchableNativeFeedback} from 'react-native';
import {styles} from '../../components/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Schedule extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.titleHeader}>Jadwal</Text>
          <TouchableNativeFeedback onPress={() => console.log('pressed')}>
            <Icon name="dots-vertical" size={30} />
          </TouchableNativeFeedback>
        </View>
        <View style={{padding: 5, flex: 1}}>
          <Text> Jadwal </Text>
        </View>
      </View>
    );
  }
}
