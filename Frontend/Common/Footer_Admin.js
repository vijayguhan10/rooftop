import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedIcon } from "../redux/actions"; // Adjust the import path as needed

const Footer_Admin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedIcon = useSelector((state) => state.footer.selectedIcon);

  const handleIconPress = (iconName) => {
    const newIcon = selectedIcon === iconName ? null : iconName;
    dispatch(setSelectedIcon(newIcon)); // Update selected icon in the store
    if (iconName === "clock-o") {
      navigation.navigate("ViewOrders");
    } else if (iconName === "motorcycle") {
      navigation.navigate("Confrimed");
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[
          styles.iconContainer,
          selectedIcon === "clock-o" && styles.selected,
        ]}
        onPress={() => handleIconPress("clock-o")}
      >
        <FontAwesome name="clock-o" size={30} color="brown" />
        <Text style={styles.iconText}>Order Waiting</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.iconContainer,
          selectedIcon === "motorcycle" && styles.selected,
        ]}
        onPress={() => handleIconPress("motorcycle")}
      >
        <FontAwesome name="motorcycle" size={30} color="brown" />
        <Text style={styles.iconText}>Order Delivery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent",
    borderTopWidth: 1,
    borderTopColor: "black",
  },
  iconContainer: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  selected: {
    backgroundColor: "lightgreen",
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
    color: "#000",
  },
});

export default Footer_Admin;
