import React, {Component} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  Text,
  View,
  Alert,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  ImageBackground,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
  Button,
  Modal,
} from 'react-native';
import {styles} from './styles';

export default class Authorization extends Component {
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
    };
  }

  login() {
    if (this.state.email && this.state.password != '') {
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
          if (responseJSON.status == 'Success') {
            console.log(responseJSON);
          } else {
            console.log(responseJSON);
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
          if (responseJSON.status == 'Success') {
            console.log(responseJSON);
          } else {
            console.log(responseJSON);
            this.warning();
          }
        })
        .catch(err => this.error(err));
    } else {
      ToastAndroid.show('Harap isi dengan benar', ToastAndroid.SHORT);
    }
  }

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
            <View style={styles.viewSplitter}>
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
            {this.state.loading ? (
              <View style={styles.button}>
                <ActivityIndicator color="white" size="small" />
              </View>
            ) : (
              <TouchableNativeFeedback onPress={() => this.login()}>
                <View style={styles.button}>
                  <Text style={styles.textButton}>Masuk</Text>
                </View>
              </TouchableNativeFeedback>
            )}
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
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: '#00000069',
            }}>
            <View style={styles.modals}>
              <View style={styles.modalHeader}>
                <Image
                  source={require('../assets/lock.png')}
                  style={styles.imgHeader}
                />
                <Text>Reset Password</Text>
                <TouchableOpacity onPress={() => this.setState({modal: false})}>
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
        </Modal>
      </View>
    );
  }

  viewRegister() {
    return (
      <View style={styles.subView}>
        <ScrollView>
          <View style={styles.mainSubView}>
            <Text style={styles.text}> Register </Text>
            <View style={{width: '95%'}}>
              <View style={{margin: 5}}></View>
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
              <View style={{margin: 5}}></View>
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
              <View style={{margin: 5}}></View>
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
            <View style={{marginTop: -15}}></View>
            <TouchableNativeFeedback>
              <View style={styles.button}>
                <Text style={styles.textButton}>Daftar</Text>
              </View>
            </TouchableNativeFeedback>
            <Text style={{color: 'grey', margin: 7}}>
              {' '}
              atau hubungkan dengan{' '}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '100%',
              }}>
              <TouchableOpacity>
                <Image
                  source={require('../assets/facebook-logo.png')}
                  style={{width: 30, height: 30, tintColor: 'blue'}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../assets/google-plus-logo-on-black-background.png')}
                  style={{width: 30, height: 30, tintColor: 'tomato'}}
                />
              </TouchableOpacity>
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
