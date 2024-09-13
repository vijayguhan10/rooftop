import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../../Common/Header";
import ProducttoUpload from "./ProducttoUpload";
import Gardening_footer from "../../Common/Gardening_footer";
import Fuse from "fuse.js";
import vegetables from "../data/db.json";

const HomePage = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fuse = new Fuse(vegetables.products, {
    keys: ["name"],
    includeScore: true,
  });

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const results = fuse.search(text).map((result) => result.item);
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header />
        <View style={styles.border} />
        <View style={styles.header}>
          <FontAwesome name="book" size={25} />
          <View style={styles.innerheader}>
            <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
              <FontAwesome name="search" size={25} style={styles.iconSpacing} />
            </TouchableOpacity>
            <FontAwesome name="shopping-cart" size={25} />
          </View>
        </View>
        {showSearch && (
          <View>
            <TextInput
              placeholder="Enter the search product"
              placeholderTextColor="black"
              style={styles.input}
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>
        )}
        <View style={styles.border} />
        <ProducttoUpload
          products={
            filteredProducts.length > 0 ? filteredProducts : vegetables.products
          }
        />
        <View style={styles.border} />
      </ScrollView>
      <Gardening_footer />
    </KeyboardAvoidingView>
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
  header: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  innerheader: {
    marginLeft: 240,
    flexDirection: "row",
  },
  iconSpacing: {
    marginRight: 20,
  },
  input: {
    marginTop: 10,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    backgroundColor: "rgb(242, 245, 245)",
    width: 340,
    justifyContent: "center",
    alignSelf: "center",
    paddingLeft: 10,
  },
});

export default HomePage;
