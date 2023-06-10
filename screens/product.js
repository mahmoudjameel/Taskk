import React, { useEffect, useState } from "react";
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
  TextInput,
  TouchableOpacity,
  Linking,
  Modal,
} from "react-native";
import axios from "axios";

// You can import from local files

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";
const { width, height } = Dimensions.get("window");

export default Product = ({ route, navigation }) => {
  const { sub_category_id, name, user_id, isLogin } = route.params;
  const [loading, setLoading] = React.useState(false);
  const [nameproduct, setnameproduct] = React.useState("");
  const [product_id, setproduct_id] = React.useState(-1);
  const [count, setcount] = React.useState(1);
  const [unit_price, setunit_price] = React.useState(0);
  const [total, settotal] = React.useState(count * unit_price);

  const [modalVisible, setModalVisible] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);
  const [product, setproduct] = useState([]);

  const [whatsapp, setwhatsapp] = useState("");

  let addproduct = async () => {
    //POST json
    const formdata = new FormData();

    formdata.append("addproduct", "addproduct");
    formdata.append("user_id", user_id);
    formdata.append("product_id", product_id);
    formdata.append("count", count);
    formdata.append("unit_price", unit_price);

    axios
      .post(
        "https://orderxgyigfomzitphujkrjr.freeorder.us/api/orders.php",
        formdata,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        response["data"];
        alert(response["data"]);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(JSON.stringify(error));
      });
  };

  const onRefresh = React.useCallback(() => {
    getwhatsapp();
    console.log(sub_category_id);
    setLoading(true);
    axios
      .get(
        "https://orderxgyigfomzitphujkrjr.freeorder.us/api/product.php?sub_category_id=" +
          sub_category_id
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setproduct(response["data"]);
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
    console.log(sub_category_id);

    console.log("start");
    setLoading(true);
    axios
      .get(
        "https://orderxgyigfomzitphujkrjr.freeorder.us/api/product.php?sub_category_id=" +
          sub_category_id
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setproduct(response["data"]);
        console.log(response["data"]);
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
        "https://orderxgyigfomzitphujkrjr.freeorder.us/api/whatsapp.php?whatsapp"
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setwhatsapp(response["data"][0]["number"]);
        console.log(response["data"][0]["number"]);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#ff9101",
                textAlign: "left",
                marginBottom: 10,
              }}
            >
              {nameproduct}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: 1,
                marginBottom: 5,
                borderBottomColor: "#018a01",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setcount(count + 1);
                  settotal((count + 1) * parseFloat(unit_price));
                }}
              >
                <Text
                  style={{ fontSize: 28, color: "blue", marginHorizontal: 10 }}
                >
                  +
                </Text>
              </TouchableOpacity>
              <Text style={styles.input}>{count}</Text>
              <TouchableOpacity
                onPress={() => {
                  var temp = count > 1 ? count - 1 : 1;
                  setcount(temp);
                  settotal(temp * parseFloat(unit_price));
                }}
              >
                <Text
                  style={{
                    outlineStyle: "none",
                    fontSize: 32,
                    color: "blue",
                    marginHorizontal: 10,
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#ff9101",
                  fontWeight: "600",
                  marginBottom: 10,
                }}
              >
                {total} ل.س
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: "#018a01",
                  fontWeight: "800",
                  marginBottom: 5,
                }}
              >
                الإجمالي:{" "}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={[styles.button, styles.buttonClose, { marginRight: 5 }]}
                onPress={() => {
                  addproduct();
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>إضافة</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonClose,
                  { backgroundColor: "blue" },
                ]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setcount(1);
                  settotal(count * parseFloat(unit_price));
                }}
              >
                <Text style={styles.textStyle}>إلغاء</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ImageBackground
        source={require("../assets/back.png")}
        style={{
          height: height,
          flex: 1,
          justifyContent: "center",
          padding: 5,
        }}
        resizeMode="cover"
      >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            {loading ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: height,
                }}
              >
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <FlatList
                data={product}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flex: 1,
                      marginBottom: 5,
                      borderWidth: 2,
                      borderColor: "#ff9101",
                      borderRadius: 15,
                    }}
                  >
                    <View
                      style={{
                        // باقس 70% نقسم على 3 أقسام
                        height: height * 0.75 * 0.35,
                        flex: 1,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          zIndex: 1,
                          position: "absolute",
                          bottom: 20,
                          left: 20,
                        }}
                        onPress={() => {
                          Linking.openURL(
                            "https://api.whatsapp.com/send/?phone=" +
                              whatsapp +
                              "&text=السلام عليكم" +
                              "%0a" +
                              "إستفسار منتج" +
                              "%0a" +
                              item.product_name
                          );
                        }}
                      >
                        <Image
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                          }}
                          source={require("../assets/whatsappNew.png")}
                        />
                      </TouchableOpacity>
                      <Image
                        style={{
                          height: height * 0.75 * 0.35,
                          borderTopLeftRadius: 15,
                          borderTopRightRadius: 15,
                          resizeMode: "cover",
                        }}
                        source={{
                          uri:
                            "https://orderxgyigfomzitphujkrjr.freeorder.us/photo/product/" +
                            item.product_url,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: "#fffb",
                        borderBottomWidth: 2,
                        borderBottomColor: "#018a01",
                        borderTopWidth: 2,
                        borderTopColor: "#ff9101",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: "700",
                          color: "black",
                          paddingTop: 10,
                        }}
                      >
                        {item.product_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: "700",
                          color: "white",
                          padding: 10,
                          backgroundColor: "#ff9101",
                          borderRadius: 25,
                          marginTop: 10,
                        }}
                      >
                        {item.price} ل.س
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "600",
                          color: "#018a01",
                          padding: 10,
                        }}
                      >
                        {item.details}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#018a01",
                        borderBottomLeftRadius: 13,
                        borderBottomRightRadius: 13,
                      }}
                      onPress={() => {
                        if (isLogin) {
                          setproduct_id(item.product_id);
                          setnameproduct(item.product_name);
                          setunit_price(item.price);
                          setcount(1);
                          settotal(1 * parseFloat(item.price));
                          setModalVisible(true);
                        } else {
                          navigation.navigate("Login");
                        }
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: "700",
                          marginHorizontal: 5,
                          padding: 5,
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        إضافة الى السلة
                      </Text>
                    </TouchableOpacity>
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
  input: {
    width: 100,
    height: 35,
    padding: 5,
    marginBottom: 10,
    backgroundColor: "#e6e6ec",
    borderRadius: 15,
    shadowColor: "#018a01",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    fontSize: 18,
    textAlign: "center",
    shadowOffset: { width: 0.5, height: 0.4 },
    outlineStyle: "none",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#ff9101",
  },
  textStyle: {
    color: "white",
    paddingHorizontal: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
