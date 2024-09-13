import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Asset } from "expo-asset";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";

const logo = Asset.fromModule(require("../../Asset/logo.png")).uri;

const Login = ({ navigation }) => {
  const colors = ["red", "blue", "green", "orange", "purple"];
  const [colorIndex, setColorIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLocationRequest = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Location permission denied.",
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 40,
        style: { backgroundColor: "#f44336" },
      });
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    const locationString = `Lat: ${coords.latitude.toFixed(
      6
    )}, Lon: ${coords.longitude.toFixed(6)}`;
    setLocation(locationString);
    Toast.show({
      type: "success",
      position: "top",
      text1: "Location Accessed",
      text2: locationString,
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 40,
      style: { backgroundColor: "#4caf50" },
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    let newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    if (!phone) newErrors.phone = "Phone number is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!location) newErrors.location = "Location is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (email === "admin@example.com") {
        navigation.navigate("Sellerdetail");
        navigation.navigate("ProductHeader");
      } else {
        Toast.show({
          type: "success",
          position: "top",
          text1: "Success",
          text2: "Login successful!",
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 40,
          style: { backgroundColor: "#4caf50" }, // Fixed gradient issue
        });
      }
      setErrors({});
      setIsSubmitting(false);
    } else {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Please fill all required fields.",
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 40,
        style: { backgroundColor: "#f44336" },
      });
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    handleLocationRequest();
  }, []);

  const isFormValid = email && phone && password && location;

  return (
    <View style={styles.container}>
      <Image source={{ uri: logo }} style={styles.logo} />
      <Text style={styles.header}>
        Organic Products Deliver At your doorsteps
      </Text>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="brown" style={styles.icon} />
        <TextInput
          placeholder="Email ID"
          style={styles.input}
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="blue" style={styles.icon} />
        <TextInput
          placeholder="Mobile Number"
          style={styles.input}
          keyboardType="phone-pad"
          onChangeText={setPhone}
          value={phone}
        />
      </View>
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="black" style={styles.icon} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <View style={styles.inputContainer}>
        <Icon name="map-marker" size={20} color="red" style={styles.icon} />
        <TextInput
          placeholder="Location (Auto-filled)"
          style={[styles.input, styles.readOnlyInput]}
          value={location}
          editable={false}
        />
      </View>
      {errors.location && (
        <Text style={styles.errorText}>{errors.location}</Text>
      )}

      <Text style={[styles.loginMethodText, { color: colors[colorIndex] }]}>
        Choose your login method
      </Text>
      <View style={styles.buttonrow}>
        <TouchableOpacity
          style={[
            styles.button,
            { opacity: isSubmitting || !isFormValid ? 0.5 : 1 },
          ]}
          onPress={() => navigation.navigate("ProductHeader")}
          // disabled={isSubmitting || !isFormValid}
        >
          <Text style={styles.buttonText}>login as user</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { opacity: isSubmitting || !isFormValid ? 0.6 : 1 },
          ]}
          onPress={() => navigation.navigate("Sellerdetail")}
          // disabled={isSubmitting || !isFormValid}
        >
          <Text style={styles.buttonText}>Admin</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.undertext}>By continuing, you agree to our</Text>
        <TouchableOpacity>
          <Text style={styles.policyText}>
            <Text style={styles.linkText}>Terms of Service</Text>
            <Text> & </Text>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    paddingTop: 70,
  },
  logo: {
    width: 100,
    height: 100,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "80%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  readOnlyInput: {
    backgroundColor: "#f0f0f0",
    color: "#666",
  },
  buttonrow: {
    flexDirection: "row",
    rowGap: 5,
  },
  button: {
    backgroundColor: "darkgreen",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  undertext: {
    paddingTop: 30,
    paddingBottom: 40,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  policyText: {
    fontSize: 16,
    textAlign: "center",
  },
  linkText: {
    color: "blue",
  },
  loginMethodText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "900",
  },
  errorText: {
    color: "#f44336",
    fontSize: 14,
    textAlign: "left",
    marginLeft: "10%",
    marginTop: -10,
    marginBottom: 10,
  },
});

export default Login;
