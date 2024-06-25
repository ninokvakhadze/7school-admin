// import {AuthProvider} from "react-auth-kit"
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthError } from "react-auth-kit";
import AuthProvider from "react-auth-kit/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //   <AuthProvider
  //     authType={"cookie"}
  //     autName={"_auth"}
  //     cookieDomain={window.location.hostname}
  //     store={undefined}
  //     children={<App />}
  //     cookieSecure={false}
  //   ></AuthProvider>
  <App />
);
