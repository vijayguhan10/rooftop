import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Header from "../../Common/Header";
import {
  useFonts,
  JosefinSans_400Regular,
} from "@expo-google-fonts/josefin-sans";
import Gardening_footer from "../../Common/Gardening_footer";
const NewPlant = () => {
  const [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.border} />
      <Text style={styles.newProductText}>Enter the new product</Text>
      <View style={styles.formContainer}>
        <View style={[styles.textboxes, styles.glassmorphism]}>
          <Text style={styles.textlayer}>Enter the new vegetable</Text>
          <TextInput placeholder="Vegetable name" style={styles.input} />
        </View>
        <View style={[styles.textboxes, styles.glassmorphism]}>
          <Text style={styles.textlayer}>Enter the quantity</Text>
          <TextInput
            placeholder="Quantity in kg"
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.textboxes, styles.glassmorphism]}>
          <Text style={styles.textlayer}>Enter the photo URL</Text>
          <TextInput placeholder="Photo URL" style={styles.input} />
        </View>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.disclaimer}>
        <Text style={styles.newdisclaimer}>Disclaimer</Text>
        <Image
          source={{
            uri: "https://img.icons8.com/?size=100&id=8122&format=png&color=FA6053",
          }}
          style={styles.disclaimerImage}
        />
      </View>
      <Text style={styles.deisclamiercontent}>
        To ensure the quality and authenticity of products, adding a new
        vegetable to the market will require a two-step verification process 🛡️.
        This process will also apply to the delivery personnel when they accept
        and process orders, ensuring a seamless and secure transaction
        experience 📦
      </Text>
      <Gardening_footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  border: {
    borderTopWidth: 2,
    borderColor: "black",
    marginVertical: 10,
  },
  newProductText: {
    fontFamily: "JosefinSans_400Regular",
    fontWeight: "700",
    fontSize: 23,
    color: "black",
    marginTop: 0,
    marginLeft: 20,
  },
  formContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  textboxes: {
    marginVertical: 1,
  },
  textlayer: {
    color: "black",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  glassmorphism: {
    backgroundColor: "rgba(235, 255, 255, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: 10,
    padding: 10,
    shadowColor: "rgba(31, 38, 135, 0.37)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.32,
    shadowRadius: 32,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    width: 130,
    alignSelf: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  newdisclaimer: {
    fontSize: 20,
    paddingRight: 10,
    color: "black",
  },
  disclaimer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 20,
  },
  disclaimerImage: {
    width: 30,
    height: 30,
  },
  deisclamiercontent: {
    color: "red",
    fontSize: 10,
    width: 350,
    paddingLeft: 20,
    marginBottom: 30,
  },
});

export default NewPlant;
