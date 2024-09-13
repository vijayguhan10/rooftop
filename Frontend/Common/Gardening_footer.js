import React from "react";
import { StyleSheet, View, Image } from "react-native";

const Gardening_footer = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://img.icons8.com/?size=100&id=26194&format=png&color=000000",
        }}
        style={styles.image}
      />
      <Image
        source={{
          uri: "https://img.icons8.com/?size=100&id=VqcENlTnfzjw&format=png&color=000000",
        }}
        style={styles.image}
      />
      <Image
        source={{
          uri: "https://img.icons8.com/?size=100&id=20319&format=png&color=000000",
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 350,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop:10,
    marginBottom:20,

  },
  image: {
    width: 30,
    height: 30,
  },
});

export default Gardening_footer;
