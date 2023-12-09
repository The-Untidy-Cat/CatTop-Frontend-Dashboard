// import { getAllOrder } from "@/services/order";
// import { Button } from "antd";
// import { searchRead } from "@/services/search_read";
// import { useState } from "react";
// import { getUnlimitAllOrder } from "@/services/order";

// export default function Apps() {
//   const [keyword, setKeyword] = useState(null);
//   const limit = null;
//   const [offset, setOffset] = useState(0);
// //  "customer_id","employee", "create_at","payment_state",
//   const getData = async () => {
//     try {
//       const response = await searchRead({
//         model: "Order",
//         domain: keyword ? [["name", "=", keyword]] : [],
//         fields: ["id","payment_state","customer_id","payment_method","created_at","state","employee_id"],
//         limit,
//         offset,
//         relation: ["customer","employee"],
//       });
//       // const response = await getUnlimitAllOrder(
//       //   {
//       //     domain: [],
//       //     fields: ["id", "state", "shopping_method",]
//       //   }
//       // )
//       // const response = await searchRead({
//       //   model: "Order",
//       //   domain: keyword ? [["name", "=", keyword]] : [],
//       //   fields: ["id","state","items"],
//       //   limit,
//       //   offset,
//       // });
//       // const response = await getAllOrder()
//       console.log(response)
//       // setOrders(response?.records.map((item) => ({ ...item, key: item.id })));
//       // setLength(response?.length);
//       // setOffset(response?.offset);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   return (<Button onClick={getData}>ABC</Button>);
// }
import React from 'react';
import { Pagination } from 'antd';
const App = () => {

const handle = (a,b) => {
  console.log(a + "\n" + b)
}

return <Pagination length="24" pageSize = "5"
current = "2" onChange={handle}/>;

}
export default App;
