import React, { useState, useEffect } from "react";
import { View } from "react-native";
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
