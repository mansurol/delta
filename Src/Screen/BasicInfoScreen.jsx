import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import { setBasicInfo } from "./Redux/EmployeeSlice";

const BasicInfoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleNext = () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !gender.trim()
    ) {
      alert("All fields are required");
      return;
    }
    const dobString = dob.toISOString().split("T")[0];
    dispatch(
      setBasicInfo({ firstName, lastName, phone, gender, dob: dobString })
    );
    navigation.navigate("Skills");
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.container}>
        <Text style={styles.title}>Basic Information</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="numeric"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
        />
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.datePickerButtonText}>
            {dob
              ? `Selected Date: ${dob.toISOString().split("T")[0]}`
              : "Select Date of Birth"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleNext}>
          <Text style={styles.addButtonLabel}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    width: "100%",
    borderRadius: 10,
  },
  datePickerButton: {
    backgroundColor: "#c1c1c1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "flex-start",
    width: "100%",
  },
  datePickerButtonText: {
    color: "#fff",
    fontSize: 16,
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
    width: 40,
  },
});

export default BasicInfoScreen;
