import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import productsData from "../../data/db.json";
import Fuse from "fuse.js";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

const ProductsShow = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = () => {
      try {
        setProducts(productsData.products);
        setFilteredProducts(productsData.products);
      } catch (err) {
        setError("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const fuse = new Fuse(products, {
        keys: ["name"],
        threshold: 0.4,
      });
      const results = fuse.search(searchTerm).map((result) => result.item);
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {filteredProducts.map((product, index) => (
        <Animatable.View
          key={product.id}
          style={styles.productContainer}
          animation="slideInLeft"
          delay={index * 100}
          duration={500}
        >
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.BackgroundColors}>
            
            <View style={styles.TextDisplay}>
              <Text style={styles.texts}>{product.name}</Text>
              <Text style={styles.Ruppes}>₹ {product.price}</Text>
            </View>
            <View style={styles.Button}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ViewProduct", { product: product });
                }}
              >
                <Text style={styles.ButtonText}>view</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  productContainer: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 10,
  },
  BackgroundColors: {
    width: 195,
    height: 100,
    marginLeft: 10,
    backgroundColor: "rgb(222, 237, 221)",
    borderRadius: 4,
    position: "relative",
  },
  TextDisplay: {
    flexDirection: "row",
    columnGap: 20,
    position: "relative",
  },
  texts: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 20,
  },
  Ruppes: {
    position: "absolute",
    top: 10,
    right: 20,
    color: "green",
    fontWeight: "600",
    fontSize: 20,
  },
  Button: {
    backgroundColor: "darkgreen",
    width: 90,
    alignItems: "center",
    color: "white",
    position: "absolute",
    left: 80,
    top: 70,
  },
  ButtonText: {
    color: "white",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default ProductsShow;
