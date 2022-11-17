import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View, Text, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

import InvoiceDetails from "../screen/tenant/InvoiceDetail";
import Invoices from "../screen/tenant/Invoices";
import Parcel from "../screen/tenant/Parcel";
import Payment from "../screen/tenant/Payment";
import Reports from "../screen/tenant/Report";
import MainTenant from "../screen/tenant/MainTenant";
import AnnouceNews from "../screen/tenant/AnnouceNews";
import NewsDetail from "../screen/tenant/NewsDetail";
import { FontAwesome } from "@expo/vector-icons";

const TenantNavigation = () => {
  const TenantNavigator = createDrawerNavigator();

  const InvoiceNavigator = createNativeStackNavigator();

  const TenantsFavTabNavigator = createBottomTabNavigator();
  const TenantsNavigator = createNativeStackNavigator();
  const NewsNavigator = createNativeStackNavigator();

  const listIconToOpenDrawer = (navigation) => (
    <FontAwesome
      name="bars"
      size={24}
      color="black"
      onPress={() => navigation.openDrawer()}
    />
  );

  const listIconToOpenDrawer2 = (navigation) => (
    <FontAwesome
      name="bars"
      size={24}
      color="white"
      onPress={() => navigation.openDrawer()}
    />
  );
  //Stack
  const MyTenantsNavigator = () => {
    return (
      <TenantsNavigator.Navigator
        initialRouteName="MainLessor"
        screenOptions={{
          headerShown: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "transparent" },
        }}
      >
        <TenantsNavigator.Screen
          name="MainLessor"
          component={MainTenant}
          options={({ route, navigation }) => ({
            drawerLabel: "Main",
            title: "Home",
            headerShown: true,
            headerLeft: () => listIconToOpenDrawer2(navigation),
            headerStyle: { backgroundColor: "transparent" },
            // headerBackground: () => (
            //   <View style={{ backgroundColor: "#7dd0f5", height: "100%" }}>
            //     <Image
            //       source={require("../assets/logo.png")}
            //       style={styles.logo}
            //     ></Image>
            //   </View>
            // ),
          })}
        />
        <TenantsNavigator.Screen
          name="InvoiceBill"
          component={InvoiceNavigation}
          options={({ route }) => ({
            // title: route.params.categoryTitle,
          })}
        />
        <TenantsNavigator.Screen
          name="Parcel"
          component={Parcel}
          options={({ route }) => ({
            // title: route.params.categoryTitle,
          })}
        />
        <TenantsNavigator.Screen
          name="Reports"
          component={Reports}
          options={({ route }) => ({
            // title: route.params.categoryTitle,
            headerShown: true,
          })}
        />
        <TenantsNavigator.Screen
          name="NewsDetail"
          component={NewsDetail}
          options={({ route }) => ({
            title: route.params.title.toString(),
            headerShown: true,
            headerStyle: { backgroundColor: "transparent" },
          })}
        />
      </TenantsNavigator.Navigator>
    );
  };

  const MyTenantsFavTabNavigator = () => {
    return (
      <TenantsFavTabNavigator.Navigator
        initialRouteName="Tenants"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#71d4d9"
          //     tabBarStyle: {
          //   backgroundColor: '#d1cfcf',
          //   borderTopColor: 'transparent',
          // },
        }}
      >
        <TenantsFavTabNavigator.Screen
          name="Tenants"
          component={MyTenantsNavigator}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Entypo name="home" size={24} color={color} />;
            },
            tabBarLabel: ({ color, size }) => {
              return <Text style={{ fontSize: "12px", }}>หน้าหลัก</Text>;
            },
          }}
        />
        <TenantsFavTabNavigator.Screen
          name="Favorites"
          component={Parcel}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Fontisto name="bell-alt" size={24} color={color} />;
            },
            tabBarLabel: () => {
              return <Text style={{ fontSize: "12px" }}>การแจ้งเตือน</Text>;
            },
          }}
        />
      </TenantsFavTabNavigator.Navigator>
    );
  };

  const InvoiceNavigation = () => {
    return (
      <InvoiceNavigator.Navigator initialRouteName="Invoice">
        <InvoiceNavigator.Screen
          name="Invoices"
          component={Invoices}
          options={({ route, navigation }) => {
            return {
              title: "Invoices",
              headerLeft: () => listIconToOpenDrawer2(navigation),
              headerTintColor: "white",
              headerStyle: { backgroundColor: "transparent" },
            };
          }}
        />
        <InvoiceNavigator.Screen
          name="InvoiceDetail"
          component={InvoiceDetails}
          options={({ route, navigation }) => {
            return {
              title: "Invoice Detail",
              headerTintColor: "white",
              headerStyle: { backgroundColor: "transparent" },
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
              headerTintColor: "#47C5FC",
            };
          }}
        />
      </InvoiceNavigator.Navigator>
    );
  };

  const NewsNavigation = () => {
    return (
      <NewsNavigator.Navigator initialRouteName="AnnouceNews">
        <NewsNavigator.Screen
          name="AnnouceNews"
          component={AnnouceNews}
          options={({ route, navigation }) => {
            return {
              title: "Annouce News",
              headerLeft: () => listIconToOpenDrawer(navigation),
            };
          }}
        />
        <NewsNavigator.Screen
          name="NewsDetail"
          component={NewsDetail}
          options={({ route }) => ({
            title: route.params.title.toString(),
            headerShown: true,
          })}
        />
      </NewsNavigator.Navigator>
    );
  };

  return (
    <TenantNavigator.Navigator
      initialRouteName="Main"
      screenOptions={({ route, navigation }) => {
        return {
          headerShown: false,
        };
      }}
    >
      {/* <TenantNavigator.Screen name="AnnouceNews" component={AnnouceNews} /> */}
      <TenantNavigator.Screen
        name="Main"
        component={MyTenantsFavTabNavigator}
        options={({ route, navigation }) => ({
          drawerLabel: "Main",
          title: "",
          headerShown: false,
        })}
      />
      <TenantNavigator.Screen name="Invoice" component={InvoiceNavigation} />
      <TenantNavigator.Screen name="Parcel" component={Parcel} />
      <TenantNavigator.Screen
        name="Reports"
        component={Reports}
        options={({ route, navigation }) => {
          return {
            headerShown: true,
          };
        }}
      />
        {/* <TenantNavigator.Screen name="News" component={NewsNavigation} /> */}
    </TenantNavigator.Navigator>
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
export default TenantNavigation;
