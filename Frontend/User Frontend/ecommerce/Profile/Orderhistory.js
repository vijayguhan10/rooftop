import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  JosefinSans_400Regular,
} from "@expo-google-fonts/josefin-sans";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Asset } from "expo-asset";
const OrderHistory = () => {
  const logo = Asset.fromModule(require("../assets/logo.png"));
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  let [fontsLoaded] = useFonts({ JosefinSans_400Regular });

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const storedOrderHistory =
          JSON.parse(await AsyncStorage.getItem("orderHistory")) || [];
        console.log("Fetched order history:", storedOrderHistory);
        setOrderHistory(storedOrderHistory);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderHistory();
  }, []);

  if (!fontsLoaded || loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={logo} />
      {orderHistory.length === 0 ? (
        <Text style={styles.noOrders}>No orders found.</Text>
      ) : (
        orderHistory.map((order, index) => (
          <View key={index} style={styles.orderBox}>
            <Text style={styles.orderNumber}>
              Order Number: {order.orderNumber}
            </Text>
            {order.cart.map((item, idx) => (
              <View key={idx} style={styles.cartItem}>
                <Image
                  style={styles.productImage}
                  source={{ uri: item.image }}
                />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>Price: {item.price}</Text>
              </View>
            ))}
            <Text style={styles.totalAmount}>
              Total Amount: {order.totalAmount}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  orderBox: {
    width: "90%",
    backgroundColor: "rgb(228, 234, 242)",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productName: {
    fontFamily: "JosefinSans_400Regular",
    fontWeight: "800",
    fontSize: 14,
    flex: 1,
  },
  productPrice: {
    fontFamily: "JosefinSans_400Regular",
    fontWeight: "600",
    fontSize: 14,
    color: "green",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "right",
  },
  noOrders: {
    fontSize: 18,
    marginTop: 20,
    color: "grey",
  },
});

export default OrderHistory;
