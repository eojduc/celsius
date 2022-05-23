import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./NavigationStack";
import { AuthStack } from "./NavigationStack";
import { Loading } from "./Loading";
import { useAuth } from "../lib/hooks";

export const Router = () => {
  const auth = useAuth();

  if (auth.loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {auth.user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
