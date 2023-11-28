import DefaultLayout from "@/components/Layout";
import { useRouter } from "next/router";

export default function OrderDetail (){
    const router = useRouter();
    const { id } = router.query;
    return (
        <DefaultLayout>
            <h1>Order Detail {id}</h1>
        </DefaultLayout>
    )
}