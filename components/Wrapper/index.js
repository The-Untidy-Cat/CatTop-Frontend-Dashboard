import { Spin } from "antd";
import Login from "../Authentication";
import { useAuth } from "../Providers/AuthProvider";

export default function PrivateWrapper({ children }) {
  const { user, loadingAuth } = useAuth();
  return (
    <>
      {loadingAuth && (
        <Spin spinning={true} className="fixed w-screen h-screen z-50" />
      )}
      {!loadingAuth && !user && <Login/>}
      {!loadingAuth && user && children}
    </>
  );
}
