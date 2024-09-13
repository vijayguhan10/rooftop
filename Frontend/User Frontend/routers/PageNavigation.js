import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductHeader from "./../ecommerce/SellProduct/ProductHeader";
import Login from "../Home/Login";
import UserAccount from "./../ecommerce/Profile/UserAccount";
import ViewProduct from "./../ecommerce/SellProduct/ViewProduct";
import ProductsShow from "./../ecommerce/SellProduct/ProductsShow";
import ViewCart from "./../ecommerce/SellProduct/ViewCart";
import OrderHistory from "./../ecommerce/Profile/Orderhistory";
import TrackOrder from "./../ecommerce/Profile/TrackOrder";
import Payments from "./../Payment/Payments";
import Sellerdetail from "./../admin/Sellerdetail/Sellerdetail";
import ViewOrders from "../admin/Sellerdetail/ViewOrders";
import ViewOrderDetails from "./../admin/Sellerdetail/ViewOrderDetails";
import Confrimed from "../admin/Sellerdetail/Confrimed";
import ViewCustomerDetail from "./../admin/Sellerdetail/ViewCustomerDetail";
import HomePage from "../gardening/HomePage";
import NewPlant from "../gardening/NewPlant";
import Uploadproduct from "../gardening/UploadProduct";
const Stack = createNativeStackNavigator();
const PageNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductHeader"
          component={ProductHeader}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserAccount"
          component={UserAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewProduct"
          component={ViewProduct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductsShow"
          component={ProductsShow}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewCart"
          component={ViewCart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payment"
          component={Payments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TrackOrder"
          component={TrackOrder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sellerdetail"
          component={Sellerdetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewOrders"
          component={ViewOrders}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="viewcustomers"
          component={ViewOrderDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confrimed"
          component={Confrimed}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewCustomerDetail"
          component={ViewCustomerDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewPlant"
          component={NewPlant}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UploadProduct"
          component={Uploadproduct}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// ViewOrdersNewPlant UploadProduct
export default PageNavigation;
