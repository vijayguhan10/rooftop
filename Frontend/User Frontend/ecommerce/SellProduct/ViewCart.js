import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts, KronaOne_400Regular } from "@expo-google-fonts/krona-one";
import Header from "../../../Common/Header";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../../Common/Footer";
import { removeFromCart } from "../../../redux/actions";
const ViewCart = () => {
  const [fontsLoaded] = useFonts({
    KronaOne_400Regular,
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((initilstate) => initilstate.cart.cart || []);

  const isArray = Array.isArray(cart);

  const totalAmount = isArray
    ? cart.reduce((total, item) => total + item.price, 0)
    : 0;
  const totalKg = isArray
    ? cart.reduce((total, item) => total + item.kg, 0)
    : 0;

  const renderItem = ({ item, index }) => (
    <View>
      <View>
        <View style={styles.productBox}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <View style={styles.newrowcol}>
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productKg}>{item.kg} Kg</Text>
            </View>
            <Text style={styles.productPrice}>₹ {item.price.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.cross}
              onPress={() => dispatch(removeFromCart(index))}
            >
              <FontAwesome name="times-circle" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  if (!isArray || !fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={styles.container}>
      <Header name="UserAccount" />
      <View styles={styles.border} />
      <View style={styles.summary}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={24} color="black" />
          <Text style={styles.kronaText}>Back to ViewProducts</Text>
        </TouchableOpacity>
        <View style={styles.buttontocheckout}>
          <View>
            <Text style={styles.totalKg}>Total KG: {totalKg.toFixed(2)}</Text>
            <Text style={styles.totalAmount}>
              Total Amount: ₹ {totalAmount.toFixed(2)}
            </Text>
          </View>
          <View style={{ top: 25, right: 10 }}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => {
                navigation.navigate("Payment");
              }}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.checkoutContainer}></View>
      <Footer></Footer>
    </View>
  );
};

const styles = StyleSheet.create({
  cross: {
    position: "absolute",
    top: -25,
    left: 195,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  // border: {
  //   borderColor: "black",
  //   borderTopWidth: 1, // Adjust the width as needed
  //   marginVertical: 10, // Adjust vertical spacing as needed
  // },
  backButton: { flexDirection: "row", marginTop: 20 },
  kronaText: {
    fontFamily: "KronaOne_400Regular",
    fontSize: 16,
    marginLeft: 8,
  },
  buttontocheckout: {
    flexDirection: "row",
  },
  summary: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  totalKg: {
    paddingTop: 30,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalAmount: {
    paddingTop: 30,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    paddingBottom: 30,
  },
  productBox: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
    marginBottom: 10,
    // backgroundColor: "#e6f0f2",
    borderBottomWidth: 1,
  },
  productImage: {
    marginTop: 30,
    width: 80,
    height: 80,
    marginRight: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 20,
  },
  newrowcol: {
    flexDirection: "row",
    backgroundColor: "#E7FBE7",
    width: 220,
    height: 70,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productKg: {
    fontSize: 18,
    color: "#555",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "500",
    color: "darkgreen",
    top: 10,
    right: 30,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  checkoutContainer: {
    alignItems: "center",
    marginTop: 0,
  },
  checkoutButton: {
    backgroundColor: "#2F4E2F",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 7,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ViewCart;
