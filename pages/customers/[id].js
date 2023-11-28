import DefaultLayout from "@/components/Layout";
import { useRouter } from "next/router";

export default function Customer (){
    const router = useRouter();
    const { id } = router.query;
    return (
        <DefaultLayout>
            <h1>Customer {id}</h1>
        </DefaultLayout>
    )
}