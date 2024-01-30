import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SuccessMessage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Submit successfully</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Employee")}>
        <Text>back to home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    color: "green",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SuccessMessage;
