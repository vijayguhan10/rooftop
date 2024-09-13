import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import logo from "../../ecommerce/assets/logo.png";
import ProductsShow from "./ProductsShow";
import Header from "./../../../Common/Header";
import Footer from "./../../../Common/Footer";
const ProductHeader = ({ navigation }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <FontAwesome
          name="user"
          size={40}
          color="black"
          style={styles.icon}
          onPress={() => navigation.navigate("UserAccount")}
        />
      </View> */}
      <Header name="UserAccount" />
      <View style={styles.mainContent}>
        <Text style={styles.text}>Organic Food And Vegetables</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSearchVisible(!searchVisible)}
          >
            <FontAwesome name="search" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <FontAwesome
              name="shopping-cart"
              size={24}
              color="black"
              onPress={() => navigation.navigate("ViewCart")}
            />
          </TouchableOpacity>
        </View>
      </View>
      {searchVisible && (
        <TextInput
          id="search-bar"
          name="search"
          placeholder="Search..."
          style={styles.searchBar}
          autoFocus={true}
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
      )}
      <View style={styles.border}></View>
      <ProductsShow searchTerm={searchTerm} />
      <Footer></Footer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  icon: {
    marginLeft: 20,
  },
  border: {
    borderColor: "black",
    borderTopWidth: 1,
    borderStyle: "solid",
    marginTop: 20,
  },
  mainContent: {
    flexDirection: "row",
    marginTop: 20,
  },
  text: {
    marginRight: 90,
    fontFamily: "sans-serif",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    marginRight: 20,
  },
  searchBar: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    backgroundColor: "#f8f8f8",
  },
});

export default ProductHeader;
