import DefaultLayout from "@/components/Layout";
import { useRouter } from "next/router";

export default function Products (){
    const router = useRouter();
    const { id } = router.query;
    return (
        <DefaultLayout>
            <h1>Product {id}</h1>
        </DefaultLayout>
    )
}