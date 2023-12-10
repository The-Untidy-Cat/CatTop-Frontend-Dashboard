import { Spin } from "antd";
import Login from "../Authentication";
import { useUser } from "../Provider/AuthProvider";

export default function PrivateWrapper({ children }) {
  const { user, loadingAuth } = useUser();
  return (
    <>
      {loadingAuth && (
        <Spin spinning={true} className="flex w-full h-full items-center align-center justify-center" />
      )}
      {!loadingAuth && !user && <Login/>}
      {!loadingAuth && user && children}
    </>
  );
}
