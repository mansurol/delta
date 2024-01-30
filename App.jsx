import { View, Text } from "react-native";
import React from "react";
import Authentication from "./Src/Screen/Authentication";
import StackNav from "./Navigation/StackNav";
import { Provider } from "react-redux";
import Store from "./Src/Screen/Redux/Store";
import SuccessMessage from "./Src/Screen/SuccessMessage";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Provider store={Store}>
        <StackNav />
      </Provider>
    </View>
  );
}
