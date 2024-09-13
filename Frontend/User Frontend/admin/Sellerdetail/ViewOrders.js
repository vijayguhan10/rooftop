import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../../../Common/Header";
import EnteredDetail from "../../data/orders.json";
import Footer_Admin from "../../../Common/Footer_Admin";
import { useNavigation } from "@react-navigation/native";

const ViewOrders = () => {
  let navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.border} />
      <Text style={styles.textview}>ViewOrders</Text>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.display}>
          {EnteredDetail.map((elem) => (
            <View key={elem.id} style={styles.orderContainer}>
              <View style={styles.orderDetails}>
                <Text style={styles.basicdetails}>Order No : {elem.id}</Text>
                <Text style={styles.basicdetails}>Area : {elem.area}</Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttondesigning}
                  onPress={() => navigation.navigate("viewcustomers", { elem })}
                >
                  <Text style={styles.button}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Footer_Admin />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  border: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 340,
    marginLeft: 10,
  },
  textview: {
    fontSize: 25,
    fontFamily: "sans-serif-condensed",
    marginTop: 20,
    paddingLeft: 15,
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    height: 450,
  },
  display: {
    paddingLeft: 15,
  },
  orderContainer: {
    backgroundColor: "#E5EDE6",
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginRight: 9,
  },
  orderDetails: {
    flex: 1,
  },
  basicdetails: {
    fontWeight: "500",
    fontSize: 20,
    paddingTop: 10,
  },
  buttonContainer: {
    marginLeft: 10,
  },
  buttondesigning: {
    backgroundColor: "#094503",
    height: 40,
    width: 125,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    fontWeight: "400",
    fontSize: 20,
    color: "white",
  },
});

export default ViewOrders;
