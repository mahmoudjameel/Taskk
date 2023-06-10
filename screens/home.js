import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  RefreshControl,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';

import axios from 'axios';

import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';

// You can import from local files
import Ads from '../components/ads';

// or any pure javascript modules available in npm
const { width, height } = Dimensions.get('window');

export default function Home({ route, navigation }) {
  const { user_id, active, full_name, url } = route.params ?? 'no';
  const isLogin = active != 0 && active != 1 ? false : true;

  const [loading, setLoading] = React.useState(false);

  const [refreshing, setRefreshing] = React.useState(false);
  const [category, setcategory] = useState([]);
  const [search, setsearch] = useState('');

  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 3);

  const [_type, set_type] = useState('');
  const [_user_id, set_user_id] = useState(-1);
  const [_full_name, set_full_name] = useState('');
  const [_isLogin, set_isLogin] = useState(false);
  const [_url, set_url] = useState('nothing');
  const [_active, set_active] = useState(0);
  const [imageURL, setimageURL] = React.useState('');

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    // console.log(result);
    if (result) {
      // console.log(' == ' + result);
      if (key == 'user_id') {
        set_user_id(parseInt(result));
        set_isLogin(true);
        // console.log(_user_id);
        // console.log(_isLogin);
        //alert(_user_id);
      } else if (key == 'url') {
        set_url(result);
        // console.log(_url);
        //alert(_url);
      } else if (key == 'active') {
        set_active(result);
        // console.log(_active);
        //alert(_active);
      } else if (key == 'full_name') {
        set_full_name(result);
        // console.log(_active);
        //alert(_active);
      }
    }
  }

  getValueFor('user_id');
  getValueFor('url');
  getValueFor('active');
  getValueFor('full_name');

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/category.php?category'
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setcategory(response['data']);
        // console.log(response['data']);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executes at the last of any API call
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // console.log('start');
    setLoading(true);
    axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/category.php?category'
      )
      .then(function (response) {
        // handle response
        // alert(response["data"]);
        setcategory(response['data']);
        // console.log(response['data']);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executes at the last of any API call
        setLoading(false);
      });
  }, []);

  const getinfo_byUser_id = async (_user_id) => {
    await axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/user.php?user_id=' +
          _user_id
      )
      .then(function (response) {
        // handle response
        // console.log(response['data']);
        setfull_name(response['data'][0]['full_name']);
        setimageURL(
          'https://orderxgyigfomzitphujkrjr.freeorder.us/photo/user/' +
            response['data'][0]['url']
        );

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
  };
  return (
    <SafeAreaView style={styles.container}>
            <StatusBar hidden={true} /> 

      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text
          style={{
            fontSize: 18,
            paddingLeft: 5,
          }}>
          HOME MALL
        </Text>
        <Text style={{ width: 10 }}></Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {(isLogin || _isLogin) && (
            <Pressable
              onPress={() => {
                if (isLogin || _isLogin) {
                  navigation.navigate('Orders', {
                    isLogin: true,
                    user_id: _user_id != -1 ? _user_id : user_id,
                  });
                } else {
                  navigation.navigate('Login');
                }
              }}>
              <Image
                style={{
                  width: 42,
                  height: 42,
                  // resizeMode: 'stretch',
                  // borderRadius: 25,
                }}
                source={require('../assets/shopping.png')}
              />
            </Pressable>
          )}
          <View
            style={{
              borderRadius: 25,
              borderWidth: 2,
              padding: 1,
              marginLeft: 8,
              borderColor: isLogin || _isLogin ? '#ff9101' : '#828282',
            }}>
            <Pressable
              onPress={() => {
                if (isLogin || _isLogin) {
                  navigation.navigate('Active', {
                    isLogin: true,
                    user_id: _user_id != -1 ? _user_id : user_id,
                    full_name: _user_id != -1 ? _full_name : full_name,
                  });
                } else {
                  navigation.navigate('Login');
                }
              }}>
              {(isLogin || _isLogin) && (
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    // resizeMode: 'stretch',
                    borderRadius: 25,
                  }}
                  source={{
                    uri:
                      'https://orderxgyigfomzitphujkrjr.freeorder.us/photo/user/' +
                      (isLogin ? url : _url),
                  }}
                />
              )}
              {!(isLogin || _isLogin) && (
                <Image
                  source={require('../assets/user.png')}
                  style={styles.logo}
                />
              )}
            </Pressable>
          </View>
        </View>
      </View>
      <ImageBackground
        source={require('../assets/back.png')}
        style={{
          height: height,
          flex: 1,
          justifyContent: 'center',
        }}
        resizeMode="cover">
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Transport');
            }}
            style={[
              {
                backgroundColor: '#018a01',
              },
              styles.btn,
            ]}>
            <Text
              style={[
                {
                  fontFamily: 'Cairo_400Regular',
                },
                styles.btnText,
              ]}>
              المواصلات
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Coin');
            }}
            style={[
              {
                backgroundColor: '#ff9101',
              },
              styles.btn,
            ]}>
            <Text style={styles.btnText}>العملات</Text>
          </TouchableOpacity>
        </ScrollView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View>
            <Ads />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 8,
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  zIndex: 999,
                  right: 20,
                }}
                onPress={() => {
                  navigation.navigate('Search', {
                    name: search,
                    search: search,
                  });
                }}>
                <Image
                  source={require('../assets/search.png')}
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
              <TextInput
                onChangeText={(search) => {
                  setsearch(search);
                }}
                placeholder={'اكتب ماتبحث عنه هنا...'}
                style={styles.inputSearch}
              />
            </View>
            {loading ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: height,
                }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <FlatList
                data={category}
                numColumns={2}
                keyExtractor={({ id }, index) => id}
                style={{ paddingRight: 5, marginTop: 5 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignContent: 'flex-end',
                    }}
                    onPress={() => {
                      navigation.navigate('Sub_Category', {
                        category_id: item.category_id,
                        name: item.name,
                        isLogin: isLogin || _isLogin,
                        user_id: _user_id != -1 ? _user_id : user_id,
                      });
                    }}>
                    <View
                      style={{
                        // باقس 70% نقسم على 3 أقسام
                        height: height * 0.75 * 0.35,
                        flex: 1,
                        marginBottom: 5,
                        borderWidth: 2,
                        borderColor: '#ff9101',
                        borderRadius: 15,
                        marginLeft: 5,
                      }}>
                      <Image
                        style={{
                          height: height * 0.75 * 0.35 - 10,
                          borderRadius: 13,
                          borderBottomLeftRadius: 25,
                          borderBottomRightRadius: 25,
                          resizeMode: 'cover',
                        }}
                        source={{
                          uri:
                            'https://orderxgyigfomzitphujkrjr.freeorder.us/photo/category/' +
                            item.url,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: '700',
                          textAlign: 'center',
                          color: '#fff',
                          backgroundColor: '#018a01',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          borderBottomRightRadius: 12,
                          borderBottomLeftRadius: 12,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    height: 50,
    // borderBottomColor: '#018a01',
    // borderBottomWidth: 1,
    padding: 15,
    // paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    shadowColor: '#008b42',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  btn: {
    borderRadius: 20,
    // borderBottomLeftRadius: 18,
    // borderTopLeftRadius: 18,
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    width: width * 0.4,
    paddingHorizontal: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  inputSearch: {
    marginTop: 10,
    width: '100%',
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 15,
    elevation: 5,
    fontSize: 18,
    textAlign: 'center',
    // outlineStyle: 'none',
    borderColor: '#018a01',
    zIndex: 1,
  },
  imageStyle: {
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
