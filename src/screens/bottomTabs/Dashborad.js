import React, {Component} from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../../components/styles';
import {Picker} from '@react-native-picker/picker';

export default class Dashborad extends Component {
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
          <Text style={styles.titleHeader}>siFreelancer</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate('Pencarian')}>
              <Icon name="magnify" size={30} style={{marginRight: 20}} />
            </TouchableNativeFeedback>
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
          <Text> Beranda </Text>
        </View>
      </View>
    );
  }
}
