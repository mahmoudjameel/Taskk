import React , { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/home";
import Sub_Category from "./screens/sub_category";
import Product from "./screens/product";
import Login from "./screens/login";
import Register from "./screens/register";
import Orders from "./screens/orders";
import Transport from "./screens/transport";
import Coin from "./screens/coin";
import Active from "./screens/active";
import Search from "./screens/search";
import OneSignal from 'react-native-onesignal';
import SplashScreen from "./screens/SplashScreen"; 

const Stack = createStackNavigator();

function App() {
  const [showSplash, setShowSplash] = useState(true); 

  useEffect(() => {
    OneSignal.setAppId("6a89c60a-a9e0-4029-ace5-3b72d0282df4");
    OneSignal.setLogLevel(6, 0);
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000); 
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }


  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false, title: "الرئيسية" }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={({ route }) => ({ title: "تنشيط الحساب" })}
        name="Active"
        component={Active}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={({ route }) => ({ title: "قائمة الطلبات" })}
      />
      <Stack.Screen
        options={{ title: "المواصلات" }}
        name="Transport"
        component={Transport}
      />
      <Stack.Screen
        options={{ title: "العملات" }}
        name="Coin"
        component={Coin}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        options={({ route }) => ({ title: "تسجيل الدخول" })}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Register"
        options={({ route }) => ({ title: "تسجيل الإشتراك" })}
        component={Register}
      />
      <Stack.Screen
        name="Sub_Category"
        component={Sub_Category}
        options={({ route }) => ({ title: route.params.name })}
      />
       <Stack.Screen
        name="Search"
        component={Search}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  </NavigationContainer>

  );
}

export default App;