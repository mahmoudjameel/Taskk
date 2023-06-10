import React, { Component } from 'react';
import {
  Alert,
  Button,
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login({ route, navigation }) {
  const windowHeight = Dimensions.get('window').height;

  const [username, setusername] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [error, seterror] = React.useState(false);

  async function save(key, value) {
    // console.log(key + ':' + value);
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      alert('No values stored under that key.');
    }
  }

  let login = async () => {
    //POST json

    const formdata = new FormData();

    formdata.append('login', 'login');
    formdata.append('name', username);
    formdata.append('password', password);

    axios
      .post(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/user.php',
        formdata,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      )
      .then(function (response) {
        // handle response
        console.log(response['data']);
        navigation.navigate('Home', {
          user_id: response['data'][0]['user_id'],
          full_name: response['data'][0]['full_name'],
          url: response['data'][0]['url'],
          active: response['data'][0]['active'],
        });
        console.log(
          response['data'][0]['user_id'] +
            ' ' +
            response['data'][0]['full_name'] +
            ' ' +
            response['data'][0]['url'] +
            ' ' +
            response['data'][0]['active']
        );
        SecureStore.deleteItemAsync('user_id');
        SecureStore.deleteItemAsync('username');
        SecureStore.deleteItemAsync('full_name');
        SecureStore.deleteItemAsync('password');
        SecureStore.deleteItemAsync('url');
        SecureStore.deleteItemAsync('active');
        save('user_id', response['data'][0]['user_id'].toString());
        save('username', response['data'][0]['name']);
        save('full_name', response['data'][0]['full_name']);
        save('password', response['data'][0]['password']);
        save('url', response['data'][0]['url']);
        save('active', response['data'][0]['active']);
      }) //If response is not in json then in error
      .catch((error) => {
        // alert(JSON.stringify(error));
        console.error(JSON.stringify(error));
        seterror(true);
      });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} /> 
        <ImageBackground
          source={require('../assets/back.png')}
          resizeMode="cover"
          style={{ height: windowHeight, flex: 1, justifyContent: 'center' }}>
          <View
            style={{
              marginVertical: 15,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/login.jpg')}
              style={styles.reviewImage}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {error && (
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  خطأ في اسم المستخدم أو كلمة المرور
                </Text>
              </View>
            )}
            <View>
              <TextInput
                // value={username}
                onChangeText={(username) => {
                  setusername(username);
                  // console.log(username);
                }}
                placeholder={'اسم المستخدم'}
                style={styles.input}
              />
            </View>
            <View>
              <TextInput
                // value={password}
                onChangeText={(password) => {
                  setpassword(password);
                  // console.log(password);
                }}
                placeholder={'كلمة المرور'}
                secureTextEntry={true}
                style={styles.input}
              />
            </View>
            <TouchableOpacity onPress={login}>
              <View
                style={{
                  width: 225,
                  height: 44,
                  backgroundColor: '#ff9101',
                  borderRadius: 15,
                  shadowColor: '#018a01',
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5,
                  shadowOffset: { width: 0.5, height: 0.4 },
                  outlineStyle: 'none',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 15,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: 'white',
                  }}>
                  {'  '}
                  تسجيل الدخول
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.register}>
              <Pressable
                onPress={() => {
                  navigation.navigate('Register', {
                    isLogin: false,
                  });
                }}>
                <Text style={{ color: 'blue', fontWeight: 'bold' }}>
                  إشترك الآن
                </Text>
              </Pressable>
              <Text> غير مشترك؟ </Text>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: 225,
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#e6e6ec',
    borderRadius: 15,
    shadowColor: '#018a01',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    textAlign: 'center',
    shadowOffset: { width: 0.5, height: 0.4 },

    outlineStyle: 'none',
  },
  reviewImage: {
    resizeMode: 'contain',
    height: 200,
    width: 250,
    borderRadius: 15,
  },
  register: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
});
