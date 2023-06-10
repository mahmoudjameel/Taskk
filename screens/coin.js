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

export default Coin = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [coin, setcoin] = useState([]);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    console.log('start');
    // setLoading(true);
    axios
      .get('https://orderxgyigfomzitphujkrjr.freeorder.us/api/coin.php?coin')
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setcoin(response['data']);
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
      .get('https://orderxgyigfomzitphujkrjr.freeorder.us/api/coin.php?coin')
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setcoin(response['data']);
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
                data={coin}
                style={{
                  paddingVertical: 10,
                }}
                renderItem={({ item }) => (
                  <View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: '#FFFFFFAA',
                        borderBottomWidth: 1,
                        borderBottomColor: '#018a01',
                        marginHorizontal: 5,
                        borderRadius: 8,
                        padding: 10,
                        marginBottom: 2,
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
                        {item.city}: {item.name} {item.price}
                      </Text>
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
});
