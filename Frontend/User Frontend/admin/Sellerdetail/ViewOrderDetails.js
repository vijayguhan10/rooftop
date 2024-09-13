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
import { receiveItem } from "../../../redux/actions";
import Toast from "react-native-toast-message";

const ViewOrderDetails = ({ route }) => {
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
    dispatch(receiveItem(elem));
    Toast.show({
      type: "success",
      position: "top",
      text1: "Order Received",
      text2: "The order has been successfully received.",
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 50,
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.border} />
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Details of Customers</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text
          style={[styles.orderText, { fontFamily: "LilitaOne_400Regular" }]}
        >
          Order Number: {elem.id}
        </Text>
        <View style={styles.infoContainer}>
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
            <View key={index} style={styles.infoRow}>
              <FontAwesome name={item.icon} size={16} color="black" />
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.productsContainer}>
        <View style={styles.border} />
        <View style={styles.productsHeader}>
          <Text style={styles.headerText}>Products</Text>
          <Text style={styles.headerText}>Amount</Text>
          <Text style={styles.headerText}>Quantity</Text>
        </View>
        <View style={styles.border} />
        {elem.product ? (
          <View style={styles.productRow}>
            <Text style={styles.productDetail}>{elem.product}</Text>
            <Text style={styles.productDetail}>{elem.amount}</Text>
            <Text style={styles.productDetail}>{elem.quantity}</Text>
          </View>
        ) : (
          <Text style={styles.productDetail}>
            No product details available.
          </Text>
        )}
      </View>
      <TouchableOpacity style={styles.locationButton}>
        <View style={styles.locationRow}>
          <FontAwesome name="map-marker" size={16} color="red" />
          <Text style={styles.locationText}>Location</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.receiveButton, { backgroundColor: "#E5EDE6" }]}
        onPress={handleReceive}
      >
        <Text style={styles.receiveButtonText}>Received</Text>
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
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    backgroundColor: "green",
    marginTop: 20,
    width: 330,
    height: 40,
    textAlign: "center",
    paddingTop: 10,
    color: "white",
    fontSize: 20,
  },
  detailsContainer: {
    marginTop: 30,
  },
  orderText: {
    fontSize: 19,
    marginLeft: 20,
  },
  infoContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  infoLabel: {
    fontFamily: "Gruppo_400Regular",
    marginLeft: 10,
    width: 130,
  },
  infoValue: {
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
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  productDetail: {
    fontSize: 20,
    fontWeight: "600",
  },
  locationButton: {
    marginTop: 20,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 180,
    paddingVertical: 7,
    borderRadius: 25,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
    marginLeft: 5,
  },
  receiveButton: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 180,
    paddingVertical: 7,
    borderRadius: 25,
  },
  receiveButtonText: {
    fontSize: 20,
    color: "black",
    fontWeight: "700",
  },
});

export default ViewOrderDetails;
