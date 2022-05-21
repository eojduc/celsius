import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./NavigationStack";
import { AuthStack } from "./NavigationStack";
import { useAuth } from "../lib/hooks";

export const Router = () => {
  const auth = useAuth();

  return (
    <NavigationContainer>
      {auth.user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
