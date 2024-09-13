import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import menu from "../../ecommerce/assets/menu.png";
import logo from "../../ecommerce/assets/logo.png";
import { useNavigation } from "@react-navigation/native";
import { Asset } from "expo-asset";
const UserAccount = () => {
  const logo = Asset.fromModule(require("../assets/logo.png"));
  const menu = Asset.fromModule(require("../assets/menu.png"));
  const navigation = useNavigation();
  const handlePress = (action) => {
    console.log(action);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.accountHeader}>
          <Image source={menu} style={styles.image} />
          <Text style={styles.headerText}>My Account</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.border}></View>
      <Text style={styles.UserName}>Hi Vijay Guhan</Text>
      <View style={styles.border}></View>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => handlePress("Profile view")}>
          <View style={styles.iconTextContainer}>
            <FontAwesome name="user" size={30} color="black" />
            <Text style={styles.text}>Profile view</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handlePress("Rewards");
            navigation.navigate("TrackOrder");
          }}
        >
          <View style={styles.iconTextContainer}>
            <FontAwesome name="location-arrow" size={30} color="black" />
            <Text style={styles.text}>Track Order</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handlePress("Order history");
            navigation.navigate("OrderHistory");
          }}
        >
          <View style={styles.iconTextContainer}>
            <FontAwesome name="history" size={30} color="black" />
            <Text style={styles.text}>Order history</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress("Rate and review")}>
          <View style={styles.iconTextContainer}>
            <FontAwesome name="star" size={30} color="black" />
            <Text style={styles.text}>Rate and review</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress("Logo")}>
          <Image source={logo} style={styles.newImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "white",
  },
  accountHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    marginLeft: 20,
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 30,
  },
  UserName: {
    fontSize: 21,
    fontWeight: "600",
    paddingTop: 30,
    paddingLeft: 20,
  },
  border: {
    marginHorizontal: 6,
    marginTop: 20,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginVertical: 1,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
    gap: 10,
    columnGap: 20,
    rowGap: 20,
  },
  text: {
    fontSize: 24,
    marginLeft: 10,
  },
  wrapper: {
    marginTop: 50,
    gap: 20,
  },
  newImage: {
    width: 250,
    height: 200,
    marginLeft: 35,
    marginTop: 70,
  },
});

export default UserAccount;
