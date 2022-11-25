import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../screen/Login";
import Register from "../screen/Register";
import MainTenant from "../screen/tenant/MainTenant";
import { View, Text, Image, StyleSheet } from "react-native";

const LoginNavigation = () => {
  const LoginNavigator = createNativeStackNavigator();

  return (
    <LoginNavigator.Navigator
      initialRouteName="Login"
      screenOptions={({ route, navigation }) => {
        return {
          title: "Login",
          headerShown: false,
        };
      }}
    >
      <LoginNavigator.Screen name="Login" component={Login} />
      <LoginNavigator.Screen
        name="Register"
        component={Register}
        options={({ route }) => ({
          title: "Register",
          headerShown: true,
          headerStyle: { backgroundColor: "white" },
        })}
      />
      <LoginNavigator.Screen name="Main" component={MainTenant} />
    </LoginNavigator.Navigator>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: 160,
    height: 50,
    top: "40%",
    alignSelf: "center",
  },
});
export default LoginNavigation;
