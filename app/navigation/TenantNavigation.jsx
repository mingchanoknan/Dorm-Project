import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AnnouceNews from "../screen/tenant/AnnouceNews";
import InvoiceDetails from "../screen/tenant/InvoiceDetail";
import Invoices from "../screen/tenant/Invoices";
import Parcel from "../screen/tenant/Parcel";
import Payment from "../screen/tenant/Payment";
import Reports from "../screen/tenant/Report";

import { FontAwesome } from "@expo/vector-icons";

const TenantNavigation = () => {
  const TenantNavigator = createDrawerNavigator();

  const InvoiceNavigator = createNativeStackNavigator();

  const listIconToOpenDrawer = (navigation) => (
    <FontAwesome
      name="bars"
      size={24}
      color="black"
      onPress={() => navigation.openDrawer()}
    />
  );

  const InvoiceNavigation = () => {
    return (
      <InvoiceNavigator.Navigator initialRouteName="Invoice">
        <InvoiceNavigator.Screen
          name="Invoices"
          component={Invoices}
          options={({ route, navigation }) => {
            return {
              title: "Invoices",
              headerLeft: () => listIconToOpenDrawer(navigation),
              headerTintColor: '#47C5FC',
            };
          }}
        />
        <InvoiceNavigator.Screen
          name="InvoiceDetail"
          component={InvoiceDetails}
          options={({ route, navigation }) => {
            return {
              title: "Invoice Detail", 
              headerTintColor: '#47C5FC',
            };
          }}
        />
        <InvoiceNavigator.Screen
          name="Payment"
          component={Payment}
          options={({ route, navigation }) => {
            return {
              title: "Payment",
              // headerLeft: () => listIconToOpenDrawer(navigation),
              headerTintColor: '#47C5FC',
            };
          }}
        />
      </InvoiceNavigator.Navigator>
    );
  };

  return (
    <TenantNavigator.Navigator
      initialRouteName="Reports"
      screenOptions={({ route, navigation }) => {
        return {
          headerShown: false,
        };
      }}
    >
      {/* <TenantNavigator.Screen name="AnnouceNews" component={AnnouceNews} /> */}
      <TenantNavigator.Screen name="Invoice" component={InvoiceNavigation} />
      <TenantNavigator.Screen name="Parcel" component={Parcel} />
      <TenantNavigator.Screen name="Reports" component={Reports}
        options={({ route, navigation }) => {
          return {
            headerShown: true,
          }
        }}
      />
    </TenantNavigator.Navigator>
  );
};

export default TenantNavigation;
