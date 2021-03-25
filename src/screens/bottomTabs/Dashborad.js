import React, {Component} from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../../components/styles';

export default class Dashborad extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.titleHeader}>siFreelancer</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate('Pencarian')}>
              <Icon name="magnify" size={30} style={{marginRight: 20}} />
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => console.log('pressed')}>
              <Icon name="dots-vertical" size={30} />
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={{padding: 5, flex: 1}}>
          <Text> Beranda </Text>
        </View>
      </View>
    );
  }
}
