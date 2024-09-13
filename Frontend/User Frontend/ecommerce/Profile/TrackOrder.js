import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Header from './../../../Common/Header';
import Footer from './../../../Common/Footer';

const TrackOrder = () => {
  // Example order data
  const order = {
    number: "01",
    date: "23.07.2024",
    time: "2:35 pm",
    status: "On the way", // Could be "Order Confirmation", "On the way", or "Delivered"
  };

  return (
    <View style={styles.container}>
      <Header title="Order Tracking" />
      <View style={styles.orderDetails}>
        <Text style={styles.orderNumber}>Order no: {order.number}</Text>
        <Text style={styles.orderDate}>Date: {order.date}</Text>
        <Text style={styles.orderTime}>Time: {order.time}</Text>
      </View>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineStep}>
          <View style={styles.circle(order.status === "Order Confirmation")} />
          <Text>Order Confirmation</Text>
        </View>
        <View style={styles.timelineLine} />
        <View style={styles.timelineStep}>
          <View style={styles.circle(order.status === "On the way")} />
          <Text>On the way</Text>
        </View>
        <View style={styles.timelineLine} />
        <View style={styles.timelineStep}>
          <View style={styles.circle(order.status === "Delivered")} />
          <Text>Delivered</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.rateButton}>
        <Text style={styles.rateButtonText}>Rate</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  orderDetails: {
    padding: 20,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    margin: 20,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderDate: {
    fontSize: 16,
    marginTop: 5,
  },
  orderTime: {
    fontSize: 16,
    marginTop: 5,
  },
  timelineContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 20,
  },
  timelineStep: {
    alignItems: "center",
  },
  circle: (active) => ({
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: active ? "#4caf50" : "#ccc",
    marginBottom: 5,
  }),
  timelineLine: {
    height: 1,
    backgroundColor: "#ccc",
    flex: 1,
    marginHorizontal: 5,
  },
  rateButton: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 20,
  },
  rateButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  footer: {
    top: 190,
  },
});

export default TrackOrder;
