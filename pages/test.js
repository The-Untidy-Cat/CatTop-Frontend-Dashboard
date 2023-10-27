import React, { useEffect, useState } from "react";
import { getAllBrand } from "@/services/brand";

const App = () => {
    const [brands, setBrands] = useState([])
  const handleChoVui = async () => {
    const data = await getAllBrand();
    setBrands(data?.result)
  };
  useEffect(()=> {
    console.log("App");
    handleChoVui()
  }, []);
  return <>{
        brands.map(brand => <div>{brand.name}</div>)
  }
  </>;
};
export default App;
