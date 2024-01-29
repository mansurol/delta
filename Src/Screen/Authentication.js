import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

const Authentication = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simple form validation
    if (!username.trim() || !password.trim()) {
      Alert.alert(
        "Validation Error",
        "Both username and password are required."
      );
      return;
    }

    // Perform login logic (add your Authentication code here)

    // Navigate to the "Employee" screen
    navigation.navigate("Employee");

    // Reset the form fields
    setUsername("");
    setPassword("");
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleLogin}>
          <Text style={styles.addButtonLabel}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "left",
  },
  formContainer: {
    width: "100%",
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 5,
    height: 36,
    borderRadius: 10,
  },
  addButtonLabel: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 5,
    textAlign: "center",
    width: "100%",
  },
});

export default Authentication;
