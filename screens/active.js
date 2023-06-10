import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  TextInput,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

export default Active = ({ route, navigation }) => {
  const { isLogin, user_id, full_name } = route.params;
  const [loading, setLoading] = React.useState(false);
  const [active, setactive] = useState([]);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [refreshing, setRefreshing] = React.useState(false);
  const [code, setcode] = React.useState('');
  const [wallet, setwallet] = React.useState('0 ل.س');

  useEffect(() => {
    console.log(user_id);
    // setLoading(true);
    axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/code.php?getActives=getActives&user_id=' +
          user_id
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setactive(response['data']);
        console.log(response['data']);
        // setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executes at the last of any API call
        // setLoading(false);
      });

    getwallet_byUser_id();
  }, []);

  const onRefresh = () => {
    setLoading(true);
    axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/code.php?getActives=getActives&user_id=' +
          user_id
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setactive(response['data']);
        console.log(response['data']);
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

    getwallet_byUser_id();
  };

  const getwallet_byUser_id = () => {
    setLoading(true);
    axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/wallet.php?getwallet_byUser_id=' +
          user_id
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setwallet(response['data']);
        console.log(response['data']);
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
  };

  let getactive = async () => {
    //POST json

    const formdata = new FormData();

    formdata.append('active', 'active');
    formdata.append('user_id', user_id);
    formdata.append('code', code);

    await axios
      .post('https://orderxgyigfomzitphujkrjr.freeorder.us/api/code.php', formdata, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        // handle response
        console.log(response['data']);
        alert(response['data']);
      }) //If response is not in json then in error
      .catch((error) => {
        // alert(JSON.stringify(error));
        console.error(JSON.stringify(error));
        seterrorcode(true);
      });
    onRefresh();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/back.png')}
        resizeMode="cover"
        style={{
          height: windowHeight,
          flex: 1,
          justifyContent: 'flex-start',
        }}>
        <View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingTop: 50,
                }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFFAA',
                    borderBottomWidth: 1,
                    borderBottomColor: '#018a01',
                    marginHorizontal: 5,
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 2,
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      padding: 5,
                    }}>
                    {full_name}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFFAA',
                    borderBottomWidth: 1,
                    borderBottomColor: '#018a01',
                    marginHorizontal: 5,
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 2,
                    marginTop: 2,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      padding: 5,
                      color: 'green',
                    }}>
                    {wallet}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFFAA',
                    borderBottomWidth: 1,
                    borderBottomColor: '#018a01',
                    marginHorizontal: 5,
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 2,
                    marginTop: 2,
                  }}>
                  <TextInput
                    // value={code}
                    onChangeText={(code) => {
                      setcode(code);
                      // console.log(code);
                    }}
                    placeholder={'الكود'}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      getactive();
                    }}
                    style={styles.btn}>
                    <Text style={styles.btnText}>تنشيط</Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: '#D3D3FDAA',
                    borderBottomWidth: 1,
                    borderBottomColor: '#018a01',
                    marginHorizontal: 5,
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 2,
                    marginTop: 2,
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  عمليات التنشيط السابقة:
                </Text>
                <FlatList
                  data={active}
                  style={{
                    paddingVertical: 2,
                  }}
                  renderItem={({ item }) => (
                    <View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          backgroundColor: '#FFFFFFAA',
                          borderBottomWidth: 1,
                          borderBottomColor: '#018a01',
                          marginHorizontal: 5,
                          borderRadius: 8,
                          padding: 5,
                          marginBottom: 2,
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '600',
                              marginLeft: 5,
                              padding: 5,
                              margin: 5,
                              borderRadius: 15,
                              color: '#ff9101',
                            }}>
                            الكود:
                          </Text>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '600',
                              marginLeft: 5,
                              padding: 5,
                              margin: 5,
                              borderRadius: 15,
                              color: '#ff9101',
                            }}>
                            {item.code}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '600',
                              marginLeft: 5,
                              padding: 5,
                              margin: 5,
                              borderRadius: 15,
                              color: '#ff9101',
                            }}>
                            التاريخ:
                          </Text>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '600',
                              marginLeft: 5,
                              padding: 5,
                              margin: 5,
                              borderRadius: 15,
                              color: '#ff9101',
                            }}>
                            {item.date_registered}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '600',
                              marginLeft: 5,
                              padding: 5,
                              margin: 5,
                              borderRadius: 15,
                              color: '#ff9101',
                            }}>
                            المدة بالشهر:
                          </Text>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '600',
                              marginLeft: 5,
                              padding: 5,
                              margin: 5,
                              borderRadius: 15,
                              color: '#ff9101',
                            }}>
                            {item.duration}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Register', {
                      isLogin: true,
                      user_id: user_id,
                      full_name: full_name,
                    });
                  }}>
                  <Text
                    style={[
                      styles.btnText,
                      { color: 'blue', marginVertical: 10 },
                    ]}>
                    تعديل بيانات الحساب
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: 225,
    height: 36,
    marginBottom: 5,
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
  btn: {
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 5,
    height: 36,
    width: '35%',
    paddingHorizontal: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 5,
    backgroundColor: 'green',
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});
