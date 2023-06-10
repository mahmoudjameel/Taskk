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
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

export default Orders = ({ route, navigation }) => {
  const { isLogin, user_id } = route.params;
  const [loading, setLoading] = React.useState(false);
  const [orders, setorders] = useState([]);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    console.log('start');
    // setLoading(true);
    axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/orders.php?allorders=allorders&user_id=' +
          user_id
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setorders(response['data']);
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
  }, []);

  const onRefresh = () => {
    setLoading(true);
    axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/orders.php?allorders=allorders&user_id=' +
          user_id
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setorders(response['data']);
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

  const complete = () => {
    setLoading(true);
    axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/orders.php?complete_orders=complete_orders&user_id=' +
          user_id
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setorders(response['data']);
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

  const inprogress = () => {
    setLoading(true);
    axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/orders.php?inprogress_orders=inprogress_orders&user_id=' +
          user_id
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setorders(response['data']);
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

  const sentorder = (orders_id) => {
    //alert(id);
    Alert.alert('تأكيد الإرسال', 'هل أنت متأكد من إرسال الطلب ?', [
      {
        text: 'إلغاء',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'نعم', onPress: () => sentorderPost(orders_id) },
    ]);
  };

  let sentorderPost = async (orders_id) => {
    //POST json
    axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/orders.php?complete=complete&orders_id=' +
          orders_id
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setorders(response['data']);
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

  const deleteConfirm = (orders_id) => {
    //alert(id);
    Alert.alert('تأكيد الحذف', 'هل تريد الحذف بالتأكيد؟', [
      {
        text: 'إلغاء',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'نعم',
        onPress: async () => {
          await deleteorderPost(orders_id);
          onRefresh();
        },
      },
    ]);
  };

  let deleteorderPost = async (orders_id) => {
    //POST json
    await axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/orders.php?delete=delete&orders_id=' +
          orders_id
      )
      .then(function (response) {
        // handle response
        alert(response['data']);
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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/back.png')}
        resizeMode="cover"
        style={{
          height: windowHeight,
          flex: 1,
          justifyContent: 'flex-start',
        }}>
        <View>
          <ScrollView horizontal={true} contentContainerStyle={{ justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={complete}
              style={[
                {
                  backgroundColor: 'green',
                },
                styles.btn,
              ]}>
              <Text style={styles.btnText}>المكتملة</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={inprogress}
              style={[
                {
                  backgroundColor: '#ff9101',
                },
                styles.btn,
              ]}>
              <Text style={styles.btnText}>غير مكتملة</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onRefresh}
              style={[
                {
                  backgroundColor: '#018a01',
                },
                styles.btn,
              ]}>
              <Text style={styles.btnText}>الكل</Text>
            </TouchableOpacity>
          </ScrollView>
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
              <FlatList
                data={orders}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 150,
                  paddingTop: 10,
                }}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                  <View
                    style={{
                      backgroundColor: '#FFFFFF88',
                      // backgroundColor: 'rgba(247, 243, 242,0.5)',
                      //opacity: 0.8,
                      borderRadius: 10,
                      marginBottom: 8,
                      width: windowWidth,
                      marginHorizontal: 2,
                      shadowColor: '#018a01',
                      shadowOffset: { width: 1, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      elevation: 2,
                      padding: 2,
                      paddingTop: 8,
                    }}>
                    <Text
                      style={{
                        color: '#015a2b',
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginVertical: 10,
                        textAlign: 'center',
                      }}>
                      تاريخ الطلب: {item.date}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginVertical: 10,
                        textAlign: 'center',
                        padding: 8,
                        borderRadius: '15',
                        backgroundColor:
                          item.status == 'inprogress' ? 'blue' : 'green',
                      }}>
                      {item.status == 'inprogress' ? 'قيد التنفيذ' : 'مكتمل'}
                    </Text>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: '#018a01',
                        margin: 5,
                        marginBottom: 10,
                        opacity: 0.3,
                      }}></View>
                    <FlatList
                      data={item.orders_details}
                      style={{
                        paddingVertical: 10,
                      }}
                      listKey={(item, _index) => 'K' + _index.toString()}
                      keyExtractor={(item, _index) => 'K' + _index.toString()}
                      renderItem={({ item }) => (
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            paddingRight: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '600',
                              marginLeft: 5,
                              padding: 10,
                              backgroundColor: '#ff9101',
                              margin: 5,
                              borderRadius: 15,
                              color: 'white',
                            }}>
                            {item.name}: {item.count}*{item.price} ={' '}
                            {item.count * item.price}
                          </Text>
                        </View>
                      )}
                    />
                    <View
                      style={{
                        height: 1,
                        backgroundColor: '#018a01',
                        margin: 5,
                        marginBottom: 10,
                        opacity: 0.3,
                      }}></View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingBottom: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          marginLeft: 5,
                          padding: 10,
                          paddingHorizontal: 20,
                          backgroundColor: '#018a01',
                          marginHorizontal: 10,
                          borderRadius: 15,
                          color: 'white',
                          textAlign: 'center',
                        }}>
                        المجموع الكلي: {item.total}
                      </Text>
                    </View>

                    <View
                      style={{
                        height: 1,
                        backgroundColor: '#018a01',
                        margin: 5,
                        marginBottom: 10,
                        opacity: 0.3,
                      }}></View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingBottom: 10,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          sentorder(item.orders_id);
                        }}
                        style={[
                          {
                            backgroundColor: 'blue',
                          },
                          styles.btn,
                        ]}>
                        <Text style={styles.btnText}> إرسال الطلب</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          deleteConfirm(item.orders_id);
                        }}
                        style={[
                          {
                            backgroundColor: 'red',
                          },
                          styles.btn,
                        ]}>
                        <Text style={styles.btnText}> حذف </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
  },
  btn: {
    borderRadius: 20,
    // borderBottomLeftRadius: 18,
    // borderTopLeftRadius: 18,
    marginTop: 10,
    marginBottom: 10,
    height: 40,
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
});
