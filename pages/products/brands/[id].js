import DefaultLayout from "@/components/Layout";
import { useRouter } from "next/router";

export default function Brands (){
    const router = useRouter();
    const { id } = router.query;
    return (
        <DefaultLayout>
            <h1>Brand {id}</h1>
        </DefaultLayout>
    )
}