import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  useFonts,
  JosefinSans_400Regular,
} from "@expo-google-fonts/josefin-sans";
import Header from "../../Common/Header";
import GardeningFooter from "../../Common/Gardening_footer";
import { ScaledSheet } from "react-native-size-matters";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
const UploadProduct = ({ route }) => {
  const { element } = route.params || {};
  const [setvalue, valueofproduct] = useState(0);
  let [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
  });

  if (!fontsLoaded) {
    return '';
  }

  if (!element) {
    return <Text>No product details available</Text>;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.border}></View>
      <View style={styles.flexidirection}>
        <Image source={{ uri: element.image }} style={styles.imagecontainer} />
        <Text style={styles.textforimage}>{element.name}</Text>
      </View>
      <View style={styles.border}></View>
      <View>
        <Text style={styles.ammountofveg}>
          Add the Amount of {element.name} you have
        </Text>
        <TextInput
          onChangeText={(text) => setvalue(text)} // Corrected the event handler
          style={styles.textinputweight}
        />

        <TouchableOpacity style={styles.buttonforadd}>
          <Text style={styles.textforbutton}>Add the KG</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Authentication}>
        <Text style={styles.textforauthentication}>
          Ensure that the Values Provided and the ownerships are all correct
        </Text>
      </View>

      <View style={styles.ownershipBox}>
        <View style={styles.ownershipItem}>
          <FontAwesome name="user" size={24} color="black" />
          <Text style={styles.ownershipText}>Owner: VijayGuhan</Text>
        </View>
        <View style={styles.ownershipItem}>
          <FontAwesome name="map-marker" size={24} color="black" />
          <Text style={styles.ownershipText}>
            Address: Vaikkal Pattarai, Allikuttai Post, Salem-636003
          </Text>
        </View>
        <View style={styles.ownershipItem}>
          <FontAwesome name="leaf" size={24} color="black" />
          <Text style={styles.ownershipText}>Product: {element.name}</Text>
        </View>
        <View style={styles.ownershipItem}>
          <FontAwesome name="balance-scale" size={24} color="black" />
          <Text style={styles.ownershipText}>Total: 2KG</Text>
        </View>
        <View style={styles.ownershipItem}>
          <FontAwesome name="money" size={24} color="black" />
          <Text style={styles.ownershipText}>Total Amount: 300₹</Text>
        </View>
        <View style={styles.ownershipItem}>
          <FontAwesome name="truck" size={24} color="black" />
          <Text style={styles.ownershipText}>
            Your Area Delivery Man: Naveen R
          </Text>
        </View>
      </View>
      <GardeningFooter />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  border: {
    borderTopWidth: 1,
    borderColor: "black",
  },
  imagecontainer: {
    marginTop: 4,
    marginBottom: 5,
    marginLeft: 15,
    width: "25%",
    height: "90@s",
  },
  flexidirection: {
    display: "flex",
    flexDirection: "row",
  },
  textforimage: {
    fontSize: "20@ms",
    textAlign: "center",
    paddingTop: 40,
    paddingLeft: 80,
    textTransform: "capitalize",
    fontFamily: "JosefinSans_400Regular",
  },
  ammountofveg: {
    fontSize: "20@ms",
    margin: 10,
    fontFamily: "JosefinSans_400Regular",
  },
  textinputweight: {
    borderWidth: 2,
    borderColor: "black",
    width: "50%",
    marginLeft: "20%",
  },
  buttonforadd: {
    backgroundColor: "green",
    width: "30%",
    height: "30@s",
    marginLeft: "30%",
    marginTop: "5%",
    borderRadius: 2,
  },
  textforbutton: {
    color: "white",
    fontFamily: "JosefinSans_400Regular",
    
    fontWeight: "600",
    textAlign: "center",
    marginTop: "5%",
  },
  Authentication: {
    paddingTop: "10%",
    paddingLeft: "3%",
  },
  textforauthentication: {
    color: "red",
    fontFamily: "JosefinSans_400Regular",
  },
  ownershipBox: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    margin: 10,
    backgroundColor: "#f9f9f9",
  },
  ownershipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ownershipText: {
    fontSize: "16@ms",
    fontFamily: "JosefinSans_400Regular",
    marginLeft: 10,
  },
});

export default UploadProduct;
