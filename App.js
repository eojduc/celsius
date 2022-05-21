import { AuthProvider } from "./components/AuthProvider";
import { Router } from "./components/Router";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
