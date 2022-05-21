import { useProvideAuth } from "../../lib/auth";
import { authContext } from "../../lib/context";

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}