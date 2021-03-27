import React, {Component} from 'react';
import {ScrollView, Text, TouchableNativeFeedback, View} from 'react-native';
import {styles} from '../components/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Settings extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.goBack()}>
              <Icon name="chevron-left" size={30} />
            </TouchableNativeFeedback>
            <Text style={styles.titleHeader}>Pengaturan & Konfigurasi</Text>
          </View>
        </View>
        <ScrollView>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <TouchableNativeFeedback>
              <View style={styles.viewOption}>
                <Icon
                  name="crown-outline"
                  size={30}
                  style={styles.iconOption}
                />
                <Text> Pugasan </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.viewOption}>
                <Icon
                  name="palette-outline"
                  size={30}
                  style={styles.iconOption}
                />
                <Text> Tema </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.viewOption}>
                <Icon name="translate" size={30} style={styles.iconOption} />
                <Text> Bahasa </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.viewOption}>
                <Icon
                  name="calendar-clock"
                  size={30}
                  style={styles.iconOption}
                />
                <Text> Tanggal dan Waktu </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.viewOption}>
                <Icon
                  name="calendar-check-outline"
                  size={30}
                  style={styles.iconOption}
                />
                <Text> Pengaturan Tugas </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.viewOption}>
                <Icon
                  name="bell-ring-outline"
                  size={30}
                  style={styles.iconOption}
                />
                <Text> Opsi Notifikasi </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.viewOption}>
                <Icon
                  name="cloud-upload-outline"
                  size={30}
                  style={styles.iconOption}
                />
                <Text> Penyimpanan Awan </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.viewOption}>
                <Icon
                  name="database-edit"
                  size={30}
                  style={styles.iconOption}
                />
                <Text> Manajemen Data </Text>
              </View>
            </TouchableNativeFeedback>
            <View style={{alignSelf: 'center', margin: 10}}>
              <Text style={{color: 'grey'}}>
                siFreelancer for Android v0.8.0-dev-build
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
