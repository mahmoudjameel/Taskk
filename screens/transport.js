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
  Linking,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

// You can import from local files

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
const { width, height } = Dimensions.get('window');

export default Transport = ({ route, navigation }) => {
  const [loading, setLoading] = React.useState(false);

  const [refreshing, setRefreshing] = React.useState(false);
  const [transport, settransport] = useState([]);
  const [whatsapp, setwhatsapp] = useState('');

  const onRefresh = React.useCallback(() => {
    getwhatsapp();
    console.log(transport);
    setLoading(true);
    axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/transport.php?transport'
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        settransport(response['data']);
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
    getwhatsapp();
    console.log(transport);
    console.log('start');
    setLoading(true);
    axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/transport.php?transport'
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        settransport(response['data']);
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
  }, []);

  const getwhatsapp = React.useCallback(() => {
    axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/whatsapp.php?whatsapp'
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setwhatsapp(response['data'][0]['number']);
        console.log(response['data'][0]['number']);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executes at the last of any API call
      });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/back.png')}
        style={{
          height: height,
          flex: 1,
          justifyContent: 'center',
        }}
        resizeMode="cover">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View>
            {loading ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // paddingTop: 50,
                  height: height,
                }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <FlatList
                data={transport}
                style={{ padding: 5 }}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignContent: 'flex-end',
                    }}>
                    <TouchableOpacity
                      style={{
                        zIndex: 1,
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                      }}
                      onPress={() => {
                        Linking.openURL(
                          'https://api.whatsapp.com/send/?phone=' +
                            whatsapp +
                            '&text=السلام عليكم' +
                            '%0a' +
                            'إستفسار سيارة مواصلات رقم ' +
                            item.transport_id
                        );
                      }}>
                      <Image
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                        }}
                        source={require('../assets/whatsappNew.png')}
                      />
                    </TouchableOpacity>
                    <Image
                      style={{
                        height: height * 0.75 * 0.35,
                        flex: 1,
                        marginBottom: 5,
                        borderWidth: 2,
                        borderColor: '#ff9101',
                        borderRadius: 15,
                        marginLeft: 5,
                        resizeMode: 'cover',
                        zIndex: 0,
                      }}
                      source={{
                        uri:
                          'https://orderxgyigfomzitphujkrjr.freeorder.us/photo/transport/' +
                          item.url,
                      }}
                    />
                  </View>
                )}
              />
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
