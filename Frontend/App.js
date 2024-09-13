import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/Store";
import PageNavigation from './User Frontend/routers/PageNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <PageNavigation />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
