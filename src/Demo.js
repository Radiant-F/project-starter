import React, {Component} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default class Demo extends Component {
  constructor() {
    super();
    this.state = {
      daftar_provinsi: [],
      id_provinsi: 0,
      daftar_kota: [],
      id_kota: 0,
      daftar_kecamatan: [],
      id_kecamatan: 0,
    };
  }

  componentDidMount() {
    this.getProvincies();
  }

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
    this.setState({daftar_kecamatan: []});
    this.setState({id_kota: id});
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

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%'}}>
            <Text>Pilih Provinsi: </Text>
            <Picker
              selectedValue={this.state.id_provinsi}
              onValueChange={id => this.getCitiesPerProvinceID(id)}>
              {this.state.daftar_provinsi.map((v, i) => (
                <Picker.Item key={i} label={v.province} value={v.province_id} />
              ))}
            </Picker>
          </View>
          <View style={{width: '45%'}}>
            <Text>Pilih Kota/Kabupaten: </Text>
            <Picker
              selectedValue={this.state.id_kota}
              onValueChange={id => this.getKecamatanPerCityID(id)}>
              {this.state.daftar_kota.map((v, i) => (
                <Picker.Item key={i} label={v.city_name} value={v.city_id} />
              ))}
            </Picker>
          </View>
        </View>
        <Text>Pilih Kecamatan: </Text>
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
    );
  }
}
