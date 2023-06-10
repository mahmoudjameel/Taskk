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
} from 'react-native';
import axios from 'axios';

// You can import from local files

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
const { width, height } = Dimensions.get('window');

export default Sub_Category = ({ route, navigation }) => {
  const { category_id, name, user_id, isLogin } = route.params;

  const [loading, setLoading] = React.useState(false);

  const [refreshing, setRefreshing] = React.useState(false);
  const [sub_category, setsub_category] = useState([]);

  const onRefresh = React.useCallback(() => {
    console.log(category_id);
    setLoading(true);
    axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/sub_category.php?category_id=' +
          category_id
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setsub_category(response['data']);
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
    console.log(category_id);

    console.log('start');
    setLoading(true);
    axios
      .get(
        'https://orderxgyigfomzitphujkrjr.freeorder.us/api/sub_category.php?category_id=' +
          category_id
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setsub_category(response['data']);
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
                data={sub_category}
                numColumns={2}
                style={{ padding: 5 }}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignContent: 'flex-end',
                    }}
                    onPress={() => {
                      navigation.navigate('Product', {
                        sub_category_id: item.sub_category_id,
                        name: item.sub_category_name,
                        isLogin: isLogin,
                        user_id: user_id,
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
                          resizeMode: 'cover',
                        }}
                        source={{
                          uri:
                            'https://orderxgyigfomzitphujkrjr.freeorder.us/photo/sub_category/' +
                            item.sub_category_url,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: '900',
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
                        {item.sub_category_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
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
