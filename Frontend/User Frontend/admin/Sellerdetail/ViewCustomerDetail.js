import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useFonts, LilitaOne_400Regular } from "@expo-google-fonts/lilita-one";
import { Gruppo_400Regular } from "@expo-google-fonts/gruppo";
import Header from "../../../Common/Header";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

const ViewCustomerDetail = ({ route }) => {
  const { elem } = route.params;
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    LilitaOne_400Regular,
    Gruppo_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  const handleReceive = () => {
    Toast.show({
      type: "success",
      position: "top",
      text1: "Order Received",
      text2: "The order has been successfully received.",
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 140,
      bottomOffset: 0,
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.border} />
      <View style={styles.textworkign}>
        <Text style={styles.text}>Details of Customers to deliver</Text>
      </View>
      <View style={styles.textfororderContainer}>
        <Text
          style={[styles.textfororder, { fontFamily: "LilitaOne_400Regular" }]}
        >
          Order Number: {elem.id}
        </Text>
        <View style={styles.detailsContainer}>
          {[
            { icon: "user", label: "Name:", value: elem.name },
            { icon: "map-marker", label: "Area:", value: elem.area },
            { icon: "phone", label: "Phone Number:", value: elem.phone_number },
            {
              icon: "phone",
              label: "Alternative Number:",
              value: elem.alternative_number,
            },
            { icon: "envelope", label: "Pincode:", value: elem.pincode },
            { icon: "home", label: "Address:", value: elem.address },
            { icon: "flag", label: "Landmark:", value: elem.landmark },
          ].map((item, index) => (
            <View key={index} style={styles.detailRow}>
              <FontAwesome name={item.icon} size={16} color="black" />
              <Text style={styles.key}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.productsContainer}>
        <View style={styles.border} />
        <View style={styles.productsHeader}>
          <Text style={styles.productsHeaderText}>Products</Text>
          <Text style={styles.productsHeaderText}>Amount</Text>
          <Text style={styles.productsHeaderText}>Quantity</Text>
        </View>
        <View style={styles.border} />
        {elem.product ? (
          <View style={styles.productRow}>
            <Text style={styles.productDetails}>{elem.product}</Text>
            <Text style={styles.productDetails}>{elem.amount}</Text>
            <Text style={styles.productDetails}>{elem.quantity}</Text>
          </View>
        ) : (
          <Text style={styles.productDetails}>
            No product details available.
          </Text>
        )}
      </View>
      <TouchableOpacity style={styles.recievedlocation}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="map-marker" size={16} color="red" />
          <Text style={[styles.recievedtext, { marginLeft: 5 }]}>Location</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.recievedlocation, { backgroundColor: "#E5EDE6" }]}
        onPress={handleReceive}
      >
        <Text style={[styles.recievedtext, { color: "black" }]}>order delivered</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  textworkign: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    backgroundColor: "green",
    marginTop: 20,
    width: 330,
    height: 40,
    textAlign: "center",
    paddingTop: 10,
    color: "white",
    fontSize: 20,
  },
  textfororderContainer: {
    marginTop: 30,
  },
  textfororder: {
    fontSize: 19,
    marginLeft: 20,
  },
  detailsContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  key: {
    fontFamily: "Gruppo_400Regular",
    marginLeft: 10,
    width: 130,
  },
  value: {
    fontFamily: "Gruppo_400Regular",
    marginLeft: 5,
    flexShrink: 1,
  },
  productsContainer: {
    paddingTop: 40,
  },
  productsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  productsHeaderText: {
    fontSize: 22,
    fontWeight: "800",
    paddingTop: 5,
    paddingBottom: 5,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  productDetails: {
    fontSize: 20,
    fontWeight: "600",
  },
  recievedlocation: {
    marginTop: 20,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 180,
    paddingVertical: 7,
    borderRadius: 25,
  },
  recievedtext: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
  },
});

export default ViewCustomerDetail;
