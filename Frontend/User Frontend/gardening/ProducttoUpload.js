import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { HammersmithOne_400Regular } from "@expo-google-fonts/hammersmith-one";
import { useNavigation } from "@react-navigation/native";

const ProducttoUpload = ({ products }) => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    HammersmithOne_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textnew}>Explore the familiar products</Text>
      <TouchableOpacity
        style={styles.newProductContainer}
        onPress={() => navigation.navigate("NewPlant")}
      >
        <Text style={styles.newProduct}>Upload New</Text>
      </TouchableOpacity>
      <View style={styles.scrolling}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={styles.scrollView}
        >
          <View style={styles.imagecontainertoshowproducts}>
            {products.map((element) => (
              <TouchableOpacity
                key={element.id}
                style={styles.borderwidthfortheimage}
                onPress={() => {
                  navigation.navigate("UploadProduct", { element });
                }}
              >
                <Image
                  source={{ uri: element.image }}
                  style={styles.imagecontainer}
                />
                <View style={styles.bordewidthfortext} />
                <Text style={styles.textforimage}>{element.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textnew: {
    fontFamily: "HammersmithOne_400Regular",
    paddingLeft: 10,
    fontSize: 20,
  },
  newProductContainer: {
    width: 150,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: "black",
    marginLeft: "auto",
    marginRight: 30,
    height: 20,
    justifyContent: "center",
  },
  scrolling: {
    height: 320,
  },
  newProduct: {
    color: "white",
    fontSize: 15,
  },
  imagecontainertoshowproducts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imagecontainer: {
    width: 70,
    height: 70,
  },
  borderwidthfortheimage: {
    borderColor: "green",
    borderWidth: 1,
    width: 90,
    margin: 10,
    marginTop: 10,
  },
  bordewidthfortext: {
    borderTopColor: "black",
    borderWidth: 1,
  },
  textforimage: {
    fontSize: 15,
    fontFamily: "HammersmithOne_400Regular",
    textAlign: "center",
  },
  scrollView: {},
  scrollContainer: {
    paddingBottom: 10,
  },
});

export default ProducttoUpload;
