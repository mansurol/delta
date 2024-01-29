import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BasicInfoScreen from "../Src/Screen/BasicInfoScreen";
import SkillsScreen from "../Src/Screen/SkillsScreen";
import { NavigationContainer } from "@react-navigation/native";
import Employee from "../Src/Screen/Employee";
import Authentication from "../Src/Screen/Authentication";
import PreviewScreen from "../Src/Screen/PreviewScreen";

const Stack = createNativeStackNavigator();

export default function StackNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Authentication}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Employee"
          component={Employee}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
        <Stack.Screen name="Skills" component={SkillsScreen} />
        <Stack.Screen
          name="Preview Information"
          component={PreviewScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
