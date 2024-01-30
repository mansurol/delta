import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";

const Authentication = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert(
        "Validation Error",
        "Both username and password are required."
      );
      return;
    }

    navigation.navigate("Employee");

    setUsername("");
    setPassword("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
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
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: Dimensions.get("window").width > 400 ? 32 : 24,
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
    borderColor: "#fff",
    backgroundColor: "#fff",
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
