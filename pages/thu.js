import { getAllOrder } from "@/services/order";
import { Button } from "antd";

export default function Apps() {

  return (<Button onClick={getAllOrder}>ABC</Button>);
}