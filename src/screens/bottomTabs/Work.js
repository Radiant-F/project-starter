import React, {Component} from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import {styles} from '../../components/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Work extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{...styles.header, height: 55}}>
          <Text style={styles.titleHeader}>Kerjamu</Text>
        </View>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <TouchableNativeFeedback>
            <View style={styles.viewOption}>
              <Icon name="account-circle" size={30} style={styles.iconOption} />
              <Text> Akun </Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View style={styles.viewOption}>
              <Icon name="crown-outline" size={30} style={styles.iconOption} />
              <Text> Pugasan </Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View style={styles.viewOption}>
              <Icon name="repeat" size={30} style={styles.iconOption} />
              <Text> Tugas Rutin </Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View style={styles.viewOption}>
              <Icon name="reminder" size={30} style={styles.iconOption} />
              <Text> Pengingat </Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View style={styles.viewOption}>
              <Icon name="note-outline" size={30} style={styles.iconOption} />
              <Text> Catatan </Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View style={styles.viewOption}>
              <Icon name="tag-outline" size={30} style={styles.iconOption} />
              <Text> Tag </Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View style={styles.viewOption}>
              <Icon
                name="bookmark-multiple-outline"
                size={30}
                style={styles.iconOption}
              />
              <Text> Templat </Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View style={styles.viewOption}>
              <Icon
                name="calendar-multiselect"
                size={30}
                style={styles.iconOption}
              />
              <Text> Acara Kalender </Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => this.props.navigation.navigate('Pengaturan')}>
            <View style={styles.viewOption}>
              <Icon name="cog" size={30} style={styles.iconOption} />
              <Text> Pengaturan </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}
