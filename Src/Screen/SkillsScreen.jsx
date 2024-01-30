import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { setSkills } from "../../Redux/EmployeeSlice";

const SkillsScreen = ({ navigation }) => {
  const [skillName, setSkillName] = useState("");
  const [experience, setExperience] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const dispatch = useDispatch();

  const handleNext = () => {
    // Validate input before proceeding
    if (!skillName.trim() || !experience.trim() || !skillLevel.trim()) {
      alert("All fields are required");
      return;
    }

    dispatch(setSkills({ skillName, experience, skillLevel }));

    navigation.navigate("SuccessMessage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skill Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Skill Name"
        value={skillName}
        onChangeText={setSkillName}
      />
      <TextInput
        style={styles.input}
        placeholder="Experience in Years"
        value={experience}
        onChangeText={setExperience}
      />

      <Text style={styles.radioLabel}>Skill Level:</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            skillLevel === "Beginner" && styles.selectedButton,
          ]}
          onPress={() => setSkillLevel("Beginner")}
        >
          <Text>Beginner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.radioButton,
            skillLevel === "Intermediate" && styles.selectedButton,
          ]}
          onPress={() => setSkillLevel("Intermediate")}
        >
          <Text>Intermediate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.radioButton,
            skillLevel === "Advanced" && styles.selectedButton,
          ]}
          onPress={() => setSkillLevel("Advanced")}
        >
          <Text>Advanced</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleNext}>
        <Text style={styles.addButtonLabel}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
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
  radioLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 5,
    padding: 8,
  },
  selectedButton: {
    backgroundColor: "#007bff",
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

export default SkillsScreen;
