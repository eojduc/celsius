import { AuthProvider } from "./components/AuthScreens/AuthProvider";
import { Router } from "./components/Router";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
