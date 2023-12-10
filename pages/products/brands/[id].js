import { EditBrandForm } from "@/components/Form/brands";
import DefaultLayout from "@/components/Layout";
import FormView from "@/components/View/form";
import { getBrand } from "@/services/brand";
import { Image } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { BRAND_STATE } from "@/app.config";

export default function Brands() {
  const router = useRouter();
  const { id } = router.query;
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await getBrand(id);
      setBrand(response);
    } catch (error) {
      console.log("error", error);
      router.push("/products/brands");
    }
    setLoading(false);
  };

  const items = [
    {
      label: "Thông tin chung",
      key: "brand-info",
      children: [
        {
          type: "description",
          key: "brand-description",
          items: [
            {
              label: "Tên thương hiệu",
              children: brand?.name,
            },
            {
              label: "Trạng thái",
              children: BRAND_STATE[brand?.state],
            },
            {
              label: "Logo",
              children: (
                <Image src={brand?.image} alt="brand-logo" className="h-10" />
              ),
            },
          ],
        },
      ],
    },
  ];

  const actions = [
    {
      key: "edit-brand",
      buttonLabel: "Sửa",
      buttonType: "default",
      buttonIcon: <FaPen />,
      title: "Cập nhật thương hiệu",
      children: <EditBrandForm data={brand} onSuccess={getData} />,
      modalProps: {
        centered: true,
      },
    },
  ];

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <DefaultLayout
      title={`Chi tiết thương hiệu`}
      activeKey={"brand-list"}
      breadcrumb={[
        {
          href: "/products",
          title: "Sản phẩm",
        },
        {
          href: "/products/brands",
          title: "Thương hiệu",
        },
        {
          href: `/products/brands/${id}`,
          title: brand?.name || "Chi tiết thương hiệu",
        },
      ]}
    >
      <FormView
        title={brand?.name}
        loading={loading}
        items={items}
        actions={actions}
      />
    </DefaultLayout>
  );
}
