import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFonts, KronaOne_400Regular } from "@expo-google-fonts/krona-one";
import logo from "../../../Asset/logo.png";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { addToCart } from "./../../../redux/actions";
import Footer from "./../../../Common/Footer";
import { Asset } from "expo-asset";
const ViewProduct = ({ route }) => {
  const logo = Asset.fromModule(require("../assets/logo.png"));
  const navigation = useNavigation();
  const { product } = route.params;
  const [amount, setAmount] = useState("");
  const [availability, setAvailability] = useState(40);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleAmountChange = (value) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue) || value === "") {
      setAmount(value);
      setError("");
    } else {
      if (numericValue > availability) {
        setError("Insufficient amount");
      } else {
        setAmount(value);
        setError("");
      }
    }
  };

  const handleAddToCart = () => {
    const numericValue = parseFloat(amount);
    if (!isNaN(numericValue) && numericValue <= availability) {
      const cartItem = {
        name: product.name,
        image: product.image,
        kg: numericValue,
        price: product.price * numericValue,
      };
      dispatch(addToCart(cartItem));
      Toast.show({
        type: "success",
        text1: "Product added",
      });
      setAmount("");
      setAvailability((prevAvailability) => prevAvailability - numericValue);
    }
  };

  let [fontsLoaded] = useFonts({
    KronaOne_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.newHeader}>
        <Image style={styles.image1} source={logo} />
        <FontAwesome
          name="user"
          size={40}
          color="black"
          style={styles.icon}
          onPress={() => navigation.navigate("UserAccount")}
        />
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="arrow-left" size={24} color="black" />
        <Text style={styles.kronaText}>Back to ViewProducts</Text>
      </TouchableOpacity>
      <View style={styles.border} />
      <View style={styles.Display}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>₹ {product.price}/kg</Text>
        </View>
      </View>
      <View style={styles.border} />
      <Text style={styles.Availability}>
        Available KG: {availability.toFixed(2)}
      </Text>
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>
          Enter the amount of {product.name}
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={amount}
            onChangeText={handleAmountChange}
          />
          <Text style={styles.inputUnit}>Kg</Text>
        </View>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Text style={styles.Medical}>Medical Reports</Text>
      <Text style={styles.MedicalReport}>
        Heart health,Skin health,Cancer prevention,
        Hydration,Antioxidants,Nutrients: Vitamins A, C, K, potassium, folate
      </Text>
      <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
        <Text style={styles.cartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewCartButton}
        onPress={() => navigation.navigate("ViewCart")}
      >
        <Text style={styles.cartButtonText}>View Cart</Text>
      </TouchableOpacity>
      <Toast />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  newHeader: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 143,
    marginTop: 54,
  },
  border: {
    borderColor: "black",
    borderTopWidth: 1,
    borderStyle: "solid",
    marginVertical: 10,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  image1: {
    width: 130,
    height: 130,
    marginTop: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  kronaText: {
    fontFamily: "KronaOne_400Regular",
    fontSize: 16,
    marginLeft: 8,
  },
  Display: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontFamily: "KronaOne_400Regular",
    paddingLeft: 10,
  },
  price: {
    fontSize: 20,
    color: "green",
    marginVertical: 10,
    paddingLeft: 10,
  },
  Availability: {
    fontWeight: "600",
    fontSize: 20,
    marginTop: 6,
    textAlign: "center",
  },
  inputSection: {
    marginTop: 20,
  },
  inputLabel: {
    textAlign: "center",
    alignItems: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  inputUnit: {
    fontSize: 18,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  Medical: {
    paddingTop: 20,
    fontSize: 14,
    fontWeight: "800",
  },
  MedicalReport: {
    paddingTop: 10,
    fontSize: 19,
    width: 350,
  },
  cartButton: {
    backgroundColor: "darkgreen",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    width: 200,
    marginLeft: 50,
  },
  viewCartButton: {
    backgroundColor: "brown",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 20,
    width: 200,
    marginLeft: 50,
  },
  cartButtonText: {
    fontSize: 16,
    color: "white",
    fontFamily: "KronaOne_400Regular",
  },
});

export default ViewProduct;
