import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  useFonts,
  PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Asset } from "expo-asset";
import Header from "../../../Common/Header";

const Payment = () => {
  const logo = Asset.fromModule(require("../assets/logo.png"));
  const [selectedMethod, setSelectedMethod] = useState(null);
  let [fontsLoaded] = useFonts({ PressStart2P_400Regular });
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart || []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handlePayment = async () => {
    Toast.show({
      type: "success",
      position: "top",
      text1: "Success",
      text2: "Payment successful!",
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 40,
      style: { backgroundColor: "#4caf50" },
    });

    console.log("Cart data before payment:", cart);

    if (!Array.isArray(cart)) {
      console.error("Cart is not an array or is undefined");
      return;
    }

    try {
      const orderHistory =
        JSON.parse(await AsyncStorage.getItem("orderHistory")) || [];
      const newOrder = {
        orderNumber: orderHistory.length + 1,
        cart,
        totalAmount: cart.reduce((acc, item) => acc + (item.price || 0), 0),
      };
      orderHistory.push(newOrder);
      await AsyncStorage.setItem("orderHistory", JSON.stringify(orderHistory));
      console.log("Order history saved:", orderHistory);

      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.payment}>
        <Text style={styles.paymentText}>Payment Methods</Text>
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            selectedMethod === "cash" && styles.selectedOption,
          ]}
          onPress={() => setSelectedMethod("cash")}
        >
          <Text style={styles.paymentOptionText}>Cash On Delivery</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imageWrapper}
          onPress={() => setSelectedMethod("upi")}
        >
          <Image
            style={styles.imageUPI}
            source={{
              uri: "https://1.bp.blogspot.com/-eVq7-RkZQnU/XvdKr93brzI/AAAAAAAACco/pxujCzilVsUEdhu5MiA1nqqRctRFDZw6gCK4BGAsYHg/w1200-h630-p-k-no-nu/UPI%2BIMAGE.jpg",
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            borderColor: "black",
            borderWidth: 2,
            borderRadius: 20,
            height: 300,
            width: 300,
            backgroundColor: "white",
            alignItems: "center", // Center items horizontally
          }}
        >
          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={() => setSelectedMethod("razorpay")}
          >
            <Image
              style={styles.imageUPIRazorPay}
              source={{
                uri: "https://tse1.mm.bing.net/th?id=OIP.K4H3ZWOqnHaO-FFbDLmVkgAAAA&pid=Api&rs=1&c=1&qlt=95&w=390&h=82",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={() => setSelectedMethod("applepay")}
          >
            <Image
              style={styles.imageApplePay}
              source={{
                uri: "https://1000logos.net/wp-content/uploads/2023/03/Apple-Pay-Logo-2014.png",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={() => setSelectedMethod("amazonpay")}
          >
            <Image
              style={styles.AmazonPay}
              source={{
                uri: "https://s.yimg.com/fz/api/res/1.2/0SuVVP2Mj4PahGxvdP0L3g--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/15849460-3304-3286-94fc-d7831e10edac/t_500x300",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePayment}>
            <Text style={styles.buttonText}>Confirm Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  payment: {
    marginTop: 20,
    backgroundColor: "green",
    width: 350,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  paymentText: {
    fontSize: 14,
    color: "white",
    fontFamily: "PressStart2P_400Regular",
  },
  paymentOption: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  paymentOptionText: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "silver",
  },
  selectedOption: {
    backgroundColor: "lightgreen",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  imageWrapper: {
    margin: 10,
  },
  imageUPI: {
    width: 150,
    height: 90,
  },
  imageUPIRazorPay: {
    width: 210,
    height: 40,
  },
  imageApplePay: {
    width: 110,
    height: 60,
  },
  AmazonPay: {
    width: 189,
    height: 35,
  },
  button: {
    marginTop: 30,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Payment;
