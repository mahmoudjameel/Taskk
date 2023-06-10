import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import md5 from 'md5';

export default function Register({ route, navigation }) {
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const { isLogin, user_id } = route.params;

  const [full_name, setfull_name] = useState('');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [phone, setphone] = useState('');
  const [url, seturl] = useState('');
  const [active, setactive] = useState('');

  const [oldpassword, setoldpassword] = useState('');
  const [oldpasswordMD5, setoldpasswordMD5] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [imageURL, setimageURL] = useState('');


  let openImagePickerAsync = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
  
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        seturl(`data:image/jpeg;base64,${response.base64}`);
        setimageURL(response.uri);
        console.log(response.base64);
        console.log(response.uri);
      }
    });
  };

  const isEmpty = (val) => {
    return val === undefined || val == null || val.length <= 0 ? true : false;
  };

  const register = async () => {
    if (isEmpty(password) || isEmpty(confirmPassword)) {
      alert('يجب إدخال جميع المعلومات');
      return;
    }

    if (password !== confirmPassword) {
      alert('يجب أن تكون كلمة المرور وتأكيدها متطابقين');
      return;
    }

    if (!url) {
      alert('يرجى اختيار صورة!');
      return;
    }

    const formdata = new FormData();

    formdata.append('register', 'register');
    formdata.append('full_name', full_name);
    formdata.append('name', name);
    formdata.append('password', password);
    formdata.append('phone', phone);
    formdata.append('url', url);

    try {
      const response = await axios.post(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/user.php',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert(response.data);
      navigation.navigate('Login');
    } catch (error) {
      alert(JSON.stringify(error));
      console.error(JSON.stringify(error));
    }
  };

  let registerUpdate = async () => {
    //POST json

    if (isEmpty(password) || isEmpty(confirmPassword)) {
      alert('يجب ادخال جميع المعلومات');
      return;
    }

    if (password != confirmPassword) {
      alert('يجب أن تكون كلمة المرور وتأكيدها متطابقين');
      return;
    }

    let encodedoldpassword = md5(oldpassword);

    if (encodedoldpassword != oldpasswordMD5) {
      // alert(encodedoldpassword);
      // alert(oldpasswordMD5);
      alert('كلمة المرور الحالية غير صحيحة');
      return;
    }

    const formdata = new FormData();

    formdata.append('update', 'update');
    formdata.append('user_id', user_id);
    formdata.append('full_name', full_name);
    formdata.append('password', password);
    formdata.append('phone', phone);
    formdata.append('url', url);

    await axios
      .post(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/user.php',
        formdata,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        response['data'];
        alert(response['data']);
        navigation.navigate('Login');
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(JSON.stringify(error));
      });
  };

  React.useEffect(() => {
    console.log(user_id);

    isLogin &&
      //GET json
      axios
        .get(
          'https://orderxgyigfomzitphujkrjr.freeorder.us/api/user.php?user_id=' +
            user_id
        )
        .then(function (response) {
          // handle response
          // console.log(response['data']);
          setfull_name(response['data'][0]['full_name']);
          setphone(response['data'][0]['phone']);
          setimageURL(
            'https://orderxgyigfomzitphujkrjr.freeorder.us/photo/user/' +
              response['data'][0]['url']
          );
          seturl(response['data'][0]['url']);
          setoldpasswordMD5(response['data'][0]['password']);
          // setLoading(false);
        })
        .catch(function (error) {
          // handle error
          console.log(JSON.stringify(error));
        })
        .finally(function () {
          // always executes at the last of any API call
          // setLoading(false);
        });
  }, []);

  const logoutConfirm = () =>
    Alert.alert('تسجيل الخروج', 'هل أنت متأكد من تسجيل الخروج؟', [
      {
        text: 'إلغاء',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'نعم',
        onPress: () => {
          BackHandler.exitApp();
        },
      },
    ]);
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/back.png')}
          resizeMode="cover"
          style={{ height: windowHeight, flex: 1, justifyContent: 'center' }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                marginVertical: 15,
              }}>
 <Image
  source={
    imageURL && imageURL !== ''
      ? { uri: imageURL }
      : require('../assets/logo.png')
  }
  style={styles.reviewImage}
/>


<TouchableOpacity onPress={openImagePickerAsync}>
  <View style={styles.input}>
    <Text
      style={{
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
      }}>
      {isLogin ? 'تعديل صورتك الشخصية' : 'اختر صورتك الشخصية'}
    </Text>
  </View>
</TouchableOpacity>

            </View>
            <View>
              <TextInput
                onChangeText={(full_name) => {
                  setfull_name(full_name);
                  // console.log(full_name);
                }}
                value={full_name}
                placeholder={'الاسم الثلاثي'}
                style={styles.input}
              />
            </View>
            <View>
              <TextInput
                onChangeText={(phone) => {
                  setphone(phone);
                  // console.log(phone);
                }}
                value={phone}
                placeholder={'الموبايل'}
                style={styles.input}
              />
            </View>
            {!isLogin && (
              <View>
                <TextInput
                  // value={username}
                  onChangeText={(name) => {
                    setname(name);
                    // console.log(username);
                  }}
                  placeholder={'اسم المستخدم'}
                  style={styles.input}
                />
              </View>
            )}

            {isLogin && (
              <View>
                <TextInput
                  // value={password}
                  onChangeText={(oldpassword) => {
                    setoldpassword(oldpassword);
                    // console.log(oldpassword);
                  }}
                  placeholder={'كلمة المرور الحالية'}
                  secureTextEntry={true}
                  style={styles.input}
                />
              </View>
            )}
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
            <View>
              <TextInput
                onChangeText={(confirmPassword) => {
                  setconfirmPassword(confirmPassword);
                  // console.log(confirmPassword);
                }}
                placeholder={'تأكيد كلمة المرور'}
                secureTextEntry={true}
                style={styles.input}
              />
            </View>
            <TouchableOpacity onPress={isLogin ? registerUpdate : register}>
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
                  {isLogin ? 'تعديل البيانات' : 'تسجيل الإشتراك'}
                </Text>
              </View>
            </TouchableOpacity>
            {!isLogin && (
              <View style={styles.register}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <Text style={{ color: 'blue', fontWeight: 'bold' }}>
                    تسجل الدخول
                  </Text>
                </Pressable>
                <Text> لديك حساب؟ </Text>
              </View>
            )}
            {isLogin && (
              <View style={styles.register}>
                <Pressable
                  onPress={async () => {
                    await logoutConfirm();
                    SecureStore.deleteItemAsync('user_id');
                    SecureStore.deleteItemAsync('username');
                    SecureStore.deleteItemAsync('password');
                    SecureStore.deleteItemAsync('url');
                    SecureStore.deleteItemAsync('active');
                  }}>
                  <Text
                    style={{ color: 'blue', fontWeight: 'bold', fontSize: 18 }}>
                    تسجيل الخروج
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
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
    height: 175,
    width: 225,
    borderRadius: 15,
  },
  register: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
});
