import React from "react";
import { StyleSheet, View, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Asset } from 'expo-asset';

const logo = Asset.fromModule(require("../Asset/logo.png")).uri;

const Header = ({ name }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (name) {
      navigation.navigate(name);
    } else {
      console.warn("No route name provided");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: logo }} style={styles.logo} />
        <FontAwesome
          name="user"
          size={40}
          color="black"
          style={styles.icon}
          onPress={handlePress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: "white",
    paddingHorizontal: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  icon: {
    marginRight: 10,
  },
});

export default Header;
