import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { useCreateEmployeeMutation } from "./Redux/EmployeeApi";

const PreviewScreen = ({ navigation }) => {
  const basicInfo = useSelector((state) => state.EmployeeReducer.basicInfo);
  const skills = useSelector((state) => state.EmployeeReducer.skills);
  const [createEmployee, { isLoading, isError, error }] =
    useCreateEmployeeMutation();

  const handleSubmission = async () => {
    try {
      const employeeData = {
        employee_name: `${basicInfo.firstName} ${basicInfo.lastName}`,
        phone: basicInfo.phone,
        gender: basicInfo.gender,
        dob: basicInfo.dob,
        skillName: skills.skillName,
        experience: skills.experience,
        skillLevel: skills.skillLevel,
      };

      const result = await createEmployee(employeeData).unwrap();

      console.log("Employee created successfully:", result);
      navigation.navigate("Employee");
    } catch (err) {
      console.error("Error:", err);

      if (err.response && err.response.data) {
        console.error("Error Response:", err.response.data);
      }

      Alert.alert("Error", "Failed to submit data. Please try again.");
    }
  };

  return (
    <>
      <StatusBar backgroundColor="black" />
      <View style={styles.container}>
        <Text style={styles.title}>Preview Screen</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>First Name:</Text>
          <Text style={{ fontSize: 17 }}>{basicInfo.firstName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={{ fontSize: 17 }}>{basicInfo.lastName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={{ fontSize: 17 }}>{basicInfo.phone}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={{ fontSize: 17 }}>{basicInfo.gender}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Birthdate:</Text>
          <Text style={{ fontSize: 17 }}>{basicInfo.dob}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Skill Name:</Text>
          <Text style={{ fontSize: 17 }}>{skills.skillName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Experience:</Text>
          <Text style={{ fontSize: 17 }}>{skills.experience}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Skill Level:</Text>
          <Text style={{ fontSize: 17 }}>{skills.skillLevel}</Text>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleSubmission}>
          <Text style={styles.addButtonLabel}>Submit Information</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 5,
    height: 36,
    borderRadius: 10,
    marginTop: 15,
  },
  addButtonLabel: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 5,
    width: "100%",
    textAlign: "center",
  },
});

export default PreviewScreen;
