import DefaultLayout from "@/components/Layout";
import { useRouter } from "next/router";

export default function Employees (){
    const router = useRouter();
    const { id } = router.query;
    return (
        <DefaultLayout>
            <h1>Employee {id}</h1>
        </DefaultLayout>
    )
}