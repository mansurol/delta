import { View, Text } from "react-native";
import React from "react";
import StackNav from "./Navigation/StackNav";
import { Provider } from "react-redux";
import Store from "./Redux/Store";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Provider store={Store}>
        <StackNav />
      </Provider>
    </View>
  );
}
