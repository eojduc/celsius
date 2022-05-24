import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./AppScreens/HomeScreen";
import { SignInScreen } from "./AuthScreens/SignInScreen";

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home Screen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign In Screen"
        component={SignInScreen}
        options={{
          title: "Celsius.",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
