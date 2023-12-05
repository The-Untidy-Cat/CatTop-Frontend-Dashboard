import DefaultLayout from "@/components/Layout";
import { Button } from "antd";
import { useRouter } from "next/router";

export default function warrantyDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { proName } = router.query;
    return (
        <DefaultLayout>
            <Button type="primary w-2/12">
                Cập nhật trạng thái
            </Button>
            <h1>Order ID {id} <br /> Tên sản phẩm: {proName}</h1>
        </DefaultLayout>
    )
}