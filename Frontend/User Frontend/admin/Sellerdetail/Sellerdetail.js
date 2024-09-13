import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "./../../../Common/Header";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const Sellerdetail = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null); 
  const [sellerInfo, setSellerInfo] = useState({
    name: "",
    email: "",
    phonenumber: "",
    address: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setSellerInfo({
      ...sellerInfo,
      [field]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!sellerInfo.name) newErrors.name = "Name is required";
    if (!sellerInfo.email) newErrors.email = "Email is required";
    if (!sellerInfo.phonenumber)
      newErrors.phonenumber = "Phone number is required";
    if (!sellerInfo.address) newErrors.address = "Address is required";
    if (!sellerInfo.location) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = () => {
    console.log(sellerInfo);
    navigation.navigate("ViewOrders");
    if (validateForm()) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "All details entered successfully!",
        position: "top",
        visibilityTime: 4000,
        autoHide: true,
        style: styles.successToast,
        textStyle: styles.toastText,
      });

      setSellerInfo({
        name: "",
        email: "",
        phonenumber: "",
        address: "",
        location: "",
      });

      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      Toast.show({
        text1: "Error",
        text2: "Please fill in all the details before proceeding.",
        topOffset: 200,

        visibilityTime: 4000,
        autoHide: true,
        style: styles.errorToast,
        textStyle: styles.toastText,
      });
    }
  };

  const requestLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access location was denied"
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const locationString = `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`;
    handleInputChange("location", locationString);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.border} />
      <ScrollView ref={scrollViewRef}>
        <Text style={styles.newregistration}>New User registration</Text>
        <View style={styles.rowforinput}>
          <FontAwesome name="user" size={24} color="black" />
          <TextInput
            placeholder="Name"
            style={styles.inputbox}
            onChangeText={(value) => handleInputChange("name", value)}
            value={sellerInfo.name}
            placeholderTextColor="gray"
            keyboardType="default"
            autoCapitalize="words"
          />
        </View>
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <View style={styles.rowforinput}>
          <FontAwesome name="envelope" size={24} color="black" />
          <TextInput
            placeholder="Email"
            style={styles.inputbox}
            onChangeText={(value) => handleInputChange("email", value)}
            value={sellerInfo.email}
            placeholderTextColor="gray"
            keyboardType="email-address"
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <View style={styles.rowforinput}>
          <FontAwesome name="phone" size={24} color="black" />
          <TextInput
            placeholder="Phone Number"
            style={styles.inputbox}
            onChangeText={(value) => handleInputChange("phonenumber", value)}
            value={sellerInfo.phonenumber}
            placeholderTextColor="gray"
            keyboardType="phone-pad"
          />
        </View>
        {errors.phonenumber && (
          <Text style={styles.errorText}>{errors.phonenumber}</Text>
        )}

        <View style={styles.rowforinput}>
          <FontAwesome name="home" size={24} color="black" />
          <TextInput
            placeholder="Address"
            style={styles.inputbox}
            onChangeText={(value) => handleInputChange("address", value)}
            value={sellerInfo.address}
            placeholderTextColor="gray"
            keyboardType="default"
          />
        </View>
        {errors.address && (
          <Text style={styles.errorText}>{errors.address}</Text>
        )}

        <View style={styles.rowforinput}>
          <FontAwesome name="map-marker" size={24} color="black" />
          <TextInput
            placeholder="Location"
            style={styles.inputbox}
            onFocus={requestLocation}
            value={sellerInfo.location}
            placeholderTextColor="gray"
            keyboardType="default"
          />
        </View>
        {errors.location && (
          <Text style={styles.errorText}>{errors.location}</Text>
        )}

        <TouchableOpacity
          style={styles.buttondisigning}
          onPress={handleProceed}
        >
          <Text style={styles.buttonText}>Proceed further</Text>
        </TouchableOpacity>

        <Toast />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  newregistration: {
    margin: 10,
    fontSize: 20,
    fontFamily: "",
  },
  border: {
    borderColor: "black",
    borderBottomWidth: 1.9,
    marginTop: 3,
  },
  rowforinput: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  inputbox: {
    marginLeft: 10,
    flex: 1,
    backgroundColor: "#E5EDE6",
    borderRadius: 15,
    paddingHorizontal: 10,
    color: "black",
  },
  errorText: {
    color: "red",
    marginLeft: 34,
    marginTop: 5,
  },
  buttondisigning: {
    margin: 48,
    paddingLeft: 57,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 40,
    height: 40,
    justifyContent: "center",
    backgroundColor: "#094503",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    paddingRight: 15,
    fontWeight: "800",
  },
  successToast: {
    borderLeftColor: "green",
    borderLeftWidth: 10,
    height: 60,
    justifyContent: "center", 
    paddingHorizontal: 15, 
  },
  errorToast: {
    borderLeftColor: "red",
    borderLeftWidth: 10,
    height: 60,
    justifyContent: "center", 
    paddingHorizontal: 15, 
  },
  toastText: {
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#fff", 
  },
});

export default Sellerdetail;
