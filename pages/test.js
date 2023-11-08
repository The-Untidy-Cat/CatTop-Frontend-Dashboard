import React, { useEffect, useState } from "react";
import { getAllBrand } from "@/services/brand";
import axios from "axios";
import { api } from "@/utils/axios";
import Login from "@/components/Authentication";

const App = () => {
  const [brands, setBrands] = useState([]);
  const handleChoVui = async () => {
    // const data = await getAllBrand();
    const response = await api.get("/web/brands")
    // const data = await axios.get("https://test.ait.id.vn/v1/web/brands");
    // const csrfToken = await axios.get("https://test.ait.id.vn/v1/auth/csrf", { withCredentials: true });
    // const data2 = await axios.post("https://test.ait.id.vn/v1/auth/dash", { user: "admin", password: "admin", _token: csrfToken.data.data }, { withCredentials: true });
    const a = await api.get("/web/brands");

    console.log(response);
    setBrands(response.data.data.result);
  };
  useEffect(() => {
    console.log("App");
    handleChoVui();
  }, []);
  return (
    <>
      {brands.map((brand) => (
        <div>{brand.name}</div>
      ))}
      {/* <Login /> */}
    </>
  );
};
export default App;
