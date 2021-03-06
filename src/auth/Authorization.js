import React, {Component} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-picker/picker';
import {
  Text,
  View,
  Alert,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  ImageBackground,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import {styles} from '../components/styles';

class Authorization extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      modal: false,
      loading: false,
      secure: true,
      secure2: true,
      remember: false,
      view: 'Login',
      url: 'https://mail.google.com',
      daftar_provinsi: [],
      id_provinsi: 0,
      daftar_kota: [],
      id_kota: 0,
      daftar_kecamatan: [],
      id_kecamatan: 0,
    };
  }

  login() {
    if (this.state.email && this.state.password != '') {
      this.setState({loading: true});
      const {email, password} = this.state;
      const dataToSend = {
        email: email,
        password: password,
      };
      let form = new FormData();
      for (var key in dataToSend) {
        form.append(key, dataToSend[key]);
      }
      fetch(``, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: form,
      })
        .then(response => response.json())
        .then(responseJSON => {
          console.log(responseJSON);
          if (responseJSON.status == 'Success') {
            this.props.userData({token: responseJSON.data});
            AsyncStorage.setItem('token', responseJSON.token);
            this.setState({loading: false});
          } else {
            this.warning();
          }
        })
        .catch(err => this.error(err));
    } else {
      ToastAndroid.show('Harap isi dengan benar', ToastAndroid.SHORT);
    }
  }

  register() {
    if (
      this.state.name &&
      this.state.email &&
      this.state.password &&
      this.state.password_confirmation != ''
    ) {
      this.setState({loading: true});
      const {name, email, password, password_confirmation} = this.state;
      const dataToSend = {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      };
      let form = new FormData();
      for (var key in dataToSend) {
        form.append(key, dataToSend[key]);
      }
      fetch(``, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: form,
      })
        .then(response => response.json())
        .then(responseJSON => {
          console.log(responseJSON);
          if (responseJSON.status == 'Success') {
            this.props.userData({token: responseJSON.data});
            AsyncStorage.setItem('token', responseJSON.token);
            this.setState({loading: false});
          } else {
            this.warning();
          }
        })
        .catch(err => this.error(err));
    } else {
      ToastAndroid.show('Harap isi dengan benar', ToastAndroid.SHORT);
    }
  }

  // componentDidMount() {
  //   this.getProvincies();
  // }

  getProvincies() {
    console.log('mengambil  provinsi..');
    fetch(`https://api.rajaongkir.sipondok.com/v1/provinsi`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({daftar_provinsi: responseJSON});
        console.log('provinsi dimuat');
      })
      .catch(err => console.log(err));
  }

  getCitiesPerProvinceID(id) {
    this.setState({id_provinsi: id, daftar_kota: []});
    console.log('mengambil  kota..');
    fetch(`https://api.rajaongkir.sipondok.com/v1/kota?provinsi=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({daftar_kota: responseJSON});
        console.log('kota diambil');
        this.getKecamatanPerCityID(responseJSON[0].city_id);
      })
      .catch(err => console.log(err));
  }

  getKecamatanPerCityID(id) {
    this.setState({id_kota: id, daftar_kecamatan: []});
    console.log('mengambil  kecamatan..');
    fetch(`https://api.rajaongkir.sipondok.com/v1/kecamatan/kota/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        console.log(responseJSON);
        this.setState({daftar_kecamatan: responseJSON});
        console.log('kecamatan dimuat');
      })
      .catch(err => console.log(err));
  }

  recovery() {
    if (this.state.email != '') {
      console.log('mengirim email..');
      const {email} = this.state;
      const dataToSend = {email: email};
      let form = new FormData();
      for (var key in dataToSend) {
        form.append(key, dataToSend[key]);
      }
      fetch(``, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: form,
      })
        .then(response => response.json())
        .then(responseJSON => {
          console.log(responseJSON);
          if (responseJSON.status == 'Success') {
            this.successRecovery();
          } else {
            this.warning();
          }
        })
        .catch(err => this.error(err));
    } else {
      ToastAndroid.show('Harap isi dengan benar', ToastAndroid.SHORT);
    }
  }

  successRecovery() {
    Alert.alert(
      'Sukses',
      'Kata sandi pemulihan telah dikirim.',
      [
        {
          text: 'Nanti Saja',
        },
        {
          text: 'Buka Email',
          onPress: () => this.handlePress(),
        },
      ],
      {cancelable: false},
    );
    this.setState({modal: false, loading: false});
  }

  handlePress = async () => {
    const supported = await Linking.canOpenURL(this.state.url);
    if (supported) {
      await Linking.openURL(this.state.url);
    } else {
      Alert.alert(`Kami tidak mengenali URL ini: ${this.state.url}`);
    }
  };

  warning() {
    Alert.alert(
      'Data Tidak Ditemukan',
      'Anda belum daftar. Daftar sekarang?',
      [
        {
          text: 'Daftar',
          onPress: () => this.props.navigation.navigate('Regsiter'),
        },
        {
          text: 'Kembali',
        },
      ],
      {cancelable: true},
    );
    this.setState({loading: false});
  }

  error(err) {
    console.log(err);
    Alert.alert(
      'Terjadi Kesalahan',
      'Mohon periksa koneksi Anda, atau tunggu beberapa saat lagi.',
      [
        {
          text: 'Ulangi',
          onPress: () => this.login(),
        },
        {
          text: 'Ok',
        },
      ],
      {cancelable: false},
    );
    this.setState({loading: false});
  }

  viewLogin() {
    return (
      <View style={styles.subView}>
        <ScrollView>
          <View style={styles.mainSubView}>
            <Text style={styles.text}>Login</Text>
            <View style={{width: '95%'}}>
              <Text> Email</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../assets/gmail-logo.png')}
                  style={styles.imgIcon}
                />
                <TextInput
                  style={{flex: 1}}
                  underlineColorAndroid="orange"
                  placeholder="surelanda@gmail.com"
                  onChangeText={input => this.setState({email: input})}
                />
              </View>
              <View style={{margin: 5}}></View>
              <Text> Kata Sandi</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../assets/locked-padlock-outline.png')}
                  style={styles.imgIcon}
                />
                <TextInput
                  style={{flex: 1}}
                  underlineColorAndroid="orange"
                  secureTextEntry={this.state.secure}
                  placeholder="Masukan Kata Sandi"
                  onChangeText={input => this.setState({password: input})}
                />
                {this.state.secure ? (
                  <TouchableOpacity
                    onPress={() => this.setState({secure: !this.state.secure})}>
                    <Image
                      source={require('../assets/locked-padlock.png')}
                      style={styles.imgIcon}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.setState({secure: !this.state.secure})}>
                    <Image
                      source={require('../assets/unlocked-padlock.png')}
                      style={styles.imgIcon}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={{...styles.viewSplitter, alignItems: 'center'}}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <CheckBox
                  onValueChange={() =>
                    this.setState({remember: !this.state.remember})
                  }
                  value={this.state.remember}
                  tintColors={{true: 'orange', false: 'black'}}
                />
                <Text
                  onPress={() =>
                    this.setState({remember: !this.state.remember})
                  }>
                  Ingat Saya
                </Text>
              </View>
              <TouchableNativeFeedback
                onPress={() => this.setState({view: 'Register'})}>
                <View>
                  <Text style={{fontWeight: 'bold'}}>Daftar</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <TouchableNativeFeedback
              disabled={this.state.loading}
              onPress={() => this.props.navigation.navigate('BottomTab')}>
              <View style={styles.button}>
                {this.state.loading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.textButton}>Masuk</Text>
                )}
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => this.setState({modal: true})}>
              <View style={{marginTop: 10}}>
                <Text style={{color: 'grey'}}>Lupa Password</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </ScrollView>
        <Modal
          onRequestClose={() => this.setState({modal: false})}
          transparent
          visible={this.state.modal}
          animationType="fade">
          <TouchableWithoutFeedback
            onPress={() => this.setState({modal: false})}>
            <View style={styles.viewMainModal}>
              <View style={styles.modals}>
                <View style={styles.modalHeader}>
                  <Image
                    source={require('../assets/lock.png')}
                    style={styles.imgHeader}
                  />
                  <Text>Reset Password</Text>
                  <TouchableOpacity
                    onPress={() => this.setState({modal: false})}>
                    <Image
                      source={require('../assets/close-button.png')}
                      style={styles.imgHeader}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalContainer}>
                  <Text> Masukan Email Anda</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../assets/gmail-logo.png')}
                      style={{...styles.imgLock, marginHorizontal: 2.5}}
                    />
                    <TextInput
                      style={{flex: 1, marginHorizontal: 7}}
                      underlineColorAndroid="orange"
                      placeholder="Email"
                      onChangeText={input => this.setState({email: input})}
                    />
                  </View>
                  <TouchableNativeFeedback disabled={this.state.loading}>
                    <View
                      style={{
                        ...styles.button,
                        width: 120,
                        alignSelf: 'center',
                      }}>
                      {this.state.loading ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Text style={styles.textButton}>Kirim Email</Text>
                      )}
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }

  viewRegister() {
    return (
      <View style={styles.subView}>
        <ScrollView>
          <View style={styles.mainSubView}>
            <Text style={styles.text}> Register Baru </Text>
            <View style={{width: '95%'}}>
              <View style={{margin: 5}} />
              <Text> Nama Lengkap</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../assets/user-outline.png')}
                  style={styles.imgIcon}
                />
                <TextInput
                  style={{flex: 1}}
                  underlineColorAndroid="orange"
                  placeholder="Masukan Nama Lengkap"
                  onChangeText={input => this.setState({email: input})}
                />
              </View>
              <View style={{margin: 5}} />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.inputAdress}>
                  <Text>Pilih Provinsi: </Text>
                  <Picker
                    selectedValue={this.state.id_provinsi}
                    onValueChange={id => this.getCitiesPerProvinceID(id)}>
                    {this.state.daftar_provinsi.map((v, i) => (
                      <Picker.Item
                        key={i}
                        label={v.province}
                        value={v.province_id}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.inputAdress}>
                  <Text>Pilih Kab/Kota: </Text>
                  <Picker
                    selectedValue={this.state.id_kota}
                    onValueChange={id => this.getKecamatanPerCityID(id)}>
                    {this.state.daftar_kota.map((v, i) => (
                      <Picker.Item
                        key={i}
                        label={v.city_name}
                        value={v.city_id}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={{margin: 5}} />
              <Text>Pilih Kecamatan: </Text>
              <View style={{...styles.inputAdress, width: '100%'}}>
                <Picker
                  selectedValue={this.state.id_kecamatan}
                  onValueChange={id => this.setState({id_kecamatan: id})}>
                  {this.state.daftar_kecamatan.map((v, i) => (
                    <Picker.Item
                      key={i}
                      label={v.subdistrict_name}
                      value={v.subdistrict_id}
                    />
                  ))}
                </Picker>
              </View>
              <View style={{margin: 5}} />
              <Text> Email</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../assets/gmail-logo.png')}
                  style={styles.imgIcon}
                />
                <TextInput
                  style={{flex: 1}}
                  underlineColorAndroid="orange"
                  placeholder="surelanda@gmail.com"
                  onChangeText={input => this.setState({email: input})}
                />
              </View>
              <View style={{margin: 5}} />
              <Text> Kata Sandi</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../assets/locked-padlock-outline.png')}
                  style={styles.imgIcon}
                />
                <TextInput
                  style={{flex: 1}}
                  underlineColorAndroid="orange"
                  secureTextEntry={this.state.secure}
                  placeholder="Kata Sandi"
                  onChangeText={input => this.setState({password: input})}
                />
                {this.state.secure ? (
                  <TouchableOpacity
                    onPress={() => this.setState({secure: !this.state.secure})}>
                    <Image
                      source={require('../assets/locked-padlock.png')}
                      style={styles.imgIcon}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.setState({secure: !this.state.secure})}>
                    <Image
                      source={require('../assets/unlocked-padlock.png')}
                      style={styles.imgIcon}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View style={{margin: 5}} />
              <Text> Konfirmasi Kata Sandi</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../assets/locked-padlock-outline.png')}
                  style={styles.imgIcon}
                />
                <TextInput
                  style={{flex: 1}}
                  underlineColorAndroid="orange"
                  secureTextEntry={this.state.secure2}
                  placeholder="Konfirmasi Kata Sandi"
                  onChangeText={input =>
                    this.setState({password_confirmation: input})
                  }
                />
                {this.state.secure2 ? (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({secure2: !this.state.secure2})
                    }>
                    <Image
                      source={require('../assets/locked-padlock.png')}
                      style={styles.imgIcon}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({secure2: !this.state.secure2})
                    }>
                    <Image
                      source={require('../assets/unlocked-padlock.png')}
                      style={styles.imgIcon}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <TouchableNativeFeedback
                onPress={() => this.setState({view: 'Login'})}>
                <View style={{alignSelf: 'flex-end'}}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Masuk
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={{marginTop: -15}} />
            <TouchableNativeFeedback
              disabled={this.state.loading}
              onPress={() => this.register()}>
              <View style={styles.button}>
                {this.state.loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.textButton}>Daftar</Text>
                )}
              </View>
            </TouchableNativeFeedback>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: 'grey'}}>atau hubungkan</Text>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  marginHorizontal: 5,
                  backgroundColor: 'grey',
                }}
              />
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity>
                  <Image
                    source={require('../assets/fb-round-logo.png')}
                    style={{width: 30, height: 30, marginRight: 10}}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require('../assets/gplus-logo.png')}
                    style={{width: 30, height: 30}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <ImageBackground style={styles.bg}>
        {this.state.view == 'Login'
          ? this.viewLogin()
          : this.state.view == 'Register'
          ? this.viewRegister()
          : ''}
      </ImageBackground>
    );
  }
}

const MapStateToProps = state => {
  return {
    user: state,
  };
};

const MapDispatchToProps = dispatch => {
  return {
    userData: input => dispatch({type: 'USER_DATA', payload: input}),
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(Authorization);
