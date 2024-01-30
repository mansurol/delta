import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  TextInput,
  Button,
} from "react-native";
import {
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
} from "../../Redux/EmployeeApi";
import Icon from "react-native-vector-icons/FontAwesome";

const Employee = ({ navigation }) => {
  const { data: employees, error, isLoading } = useGetEmployeeQuery();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({
    id: null,
    name: "",
    salary: "",
    age: "",
  });

  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();
  const openEditModal = (employee) => {
    console.log("employee", employee);
    setEditedEmployee({
      id: employee.id,
      name: employee.employee_name || "",
      salary: String(employee.employee_salary),
      age: String(employee.employee_age),
    });
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const saveChanges = async (retryCount = 3) => {
    try {
      const response = await updateEmployee({
        id: editedEmployee.id,
        updatedEmployee: {
          employee_name: editedEmployee.name,
          employee_salary: editedEmployee.salary,
          employee_age: editedEmployee.age,
        },
      });

      console.log("Update response:", response);

      closeEditModal();
    } catch (error) {
      console.error("Failed to update employee:", error);

      if (error.status === 429 && retryCount > 0) {
        console.log("Rate limit exceeded. Retrying after a delay...");

        setTimeout(() => {
          saveChanges(retryCount - 1);
        }, 5000);
      } else {
      }
    }
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        alignItems="center"
        justifyContent="center"
      />
    );
  }

  if (error) {
    return <Text>Error loading employees</Text>;
  }

  const renderEmployeeCard = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => openEditModal(item)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <Text style={styles.cardText}>Name: {item.employee_name}</Text>
        <Text style={styles.cardText}>Salary: {item.employee_salary}</Text>
        <Text style={styles.cardText}>Age: {item.employee_age}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTwoColumns = () => (
    <FlatList
      data={employees.data}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={renderEmployeeCard}
    />
  );

  return (
    <View style={{ marginBottom: 100, marginTop: 30 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Text style={styles.headerStyle}>Employee List:</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("BasicInfo")}
        >
          <Text style={styles.addButtonLabel}>
            Add New <Icon name="plus" size={15} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>
      {employees ? renderTwoColumns() : <Text>No employees available</Text>}

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={closeEditModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={{ ...styles.modalInput, backgroundColor: "lightgray" }}
              placeholder="Name"
              value={editedEmployee.name}
              onChangeText={(text) =>
                setEditedEmployee({ ...editedEmployee, name: text })
              }
            />
            <TextInput
              style={{ ...styles.modalInput, backgroundColor: "lightgray" }}
              placeholder="Salary"
              value={editedEmployee.salary}
              onChangeText={(text) =>
                setEditedEmployee({ ...editedEmployee, salary: text })
              }
            />
            <TextInput
              style={{ ...styles.modalInput, backgroundColor: "lightgray" }}
              placeholder="Age"
              value={editedEmployee.age}
              onChangeText={(text) =>
                setEditedEmployee({ ...editedEmployee, age: text })
              }
            />

            <Button title="Save" onPress={saveChanges} disabled={isUpdating} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 20,
    fontWeight: "700",
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    margin: 2,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardText: {
    fontSize: 12,
    marginBottom: 8,
  },
  editButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 5,
    height: 36,
  },
  addButtonLabel: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    marginLeft: 5, // Adjust the margin based on your preference
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 10,
    width: 200,
    borderRadius: 10,
    elevation: 5,
  },
  modalInput: {
    height: 27,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
});

export default Employee;
