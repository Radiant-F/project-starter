import React, {Component} from 'react';
import {Text, View, TouchableNativeFeedback} from 'react-native';
import {styles} from '../../components/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';

export default class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      menu: 1,
    };
  }

  navigate(id) {
    this.setState({menu: id});
    console.log(this.state.menu);
    if (this.state.menu == 1) {
      this.props.navigation.navigate('Pencarian');
    } else if (this.state.menu == 2) {
      this.props.navigation.navigate('Pengaturan');
    } else {
      console.log('no id was selected');
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.titleHeader}>Jadwal</Text>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 20,
                marginRight: -25,
                height: 30,
              }}>
              <Picker
                dropdownIconColor="white"
                mode="dropdown"
                selectedValue={this.state.menu}
                onValueChange={id => this.navigate(id)}>
                <Picker.Item value={1} label="Pengaturan" />
                <Picker.Item value={2} label="Pencarian" />
              </Picker>
            </View>
            <TouchableNativeFeedback onPress={() => console.log('pressed')}>
              <Icon name="dots-vertical" size={30} />
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={{padding: 5, flex: 1}}>
          <Text> Jadwal </Text>
        </View>
      </View>
    );
  }
}
