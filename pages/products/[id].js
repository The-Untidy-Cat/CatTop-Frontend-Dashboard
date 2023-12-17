import { PRODUCT_STATE } from "@/app.config";
import NewProductVariantForm, { EditProductVariantForm } from "@/components/Form/product_variant";
import { EditProductForm } from "@/components/Form/products";
import DefaultLayout from "@/components/Layout";
import { ModalToggle } from "@/components/Modal";
import FormView from "@/components/View/form";
import { getProduct } from "@/services/product";
import { formatCurrency } from "@/utils/currency";
import { Image } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPen, FaQuestion } from "react-icons/fa";

export default function Products() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const variantsTableColumn = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Tên biến thể",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Giá gốc",
      dataIndex: "standard_price",
      key: "standard_price",
      render: (text) => formatCurrency(text),
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      render: (text) => Number(text) * 100 + "%",
      width: 80,
    },
    {
      title: "Giá bán",
      dataIndex: "sale_price",
      key: "sale_price",
      render: (text) => formatCurrency(text),
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
      width: 80,
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      key: "state",
      width: 100,
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <ModalToggle
          button={{
            label: "Chi tiết",
            type: "text",
          }}
          modal={{
            title: "Chi tiết biến thể",
          }}
        >
          <EditProductVariantForm onSuccess={getData} productId={product.id} variantId={record?.id}/>
        </ModalToggle>
      ),
      width: 80,
      fixed: 'right',
    },
  ];

  const getData = async () => {
    setLoading(true);
    getProduct(id)
      .then((res) => {
        // console.log(res);
        setProduct(res);
      })
      .catch((err) => {
        console.log(err);
        // router.push("/products");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const actions = [
    {
      key: "edit-product",
      buttonLabel: "Sửa",
      buttonType: "default",
      buttonIcon: <FaPen />,
      title: "Cập nhật sản phẩm",
      children: (
        <EditProductForm
          data={{ ...product, brand_id: product?.brand?.id }}
          onSuccess={getData}
        />
      ),
      modalProps: {
        centered: true,
      },
    },
  ];

  const items = [
    {
      key: "product-info",
      label: "Thông tin sản phẩm",
      children: [
        {
          type: "description",
          key: "product-description",
          items: [
            {
              label: "Tên sản phẩm",
              children: product?.name,
            },
            {
              label: "Hình ảnh",
              children: (
                <Image
                  src={product?.image}
                  alt="hinh-anh-san-pham"
                  className="h-28 w-28 object-cover"
                  loading="lazy"
                  fallback={<FaQuestion />}
                />
              ),
            },
            {
              label: "Thương hiệu",
              width: "100px",
              children: (
                <Link href={`/brands/${product?.brand?.id}`}>
                  {product?.brand?.name}
                </Link>
              ),
            },
            {
              label: "Slug",
              children: product?.slug,
            },
            {
              label: "Trạng thái",
              children: PRODUCT_STATE[product?.state],
            },
          ],
        },
      ],
    },
    {
      key: "product-variant-info",
      label: "Biến thể",
      children: [
        {
          type: "table",
          key: "variant-list",
          items: {
            actions: [
              {
                key: "add",
                buttonLabel: "Thêm",
                buttonType: "primary",
                buttonIcon: <FaPen />,
                title: "Thêm mới",
                children: (
                  <NewProductVariantForm
                    onSuccess={getData}
                    productId={product?.id}
                  />
                ),
                modalProps: {
                  centered: true,
                },
              },
            ],
            table: {
              bordered: true,
              loading: loading,
              data: product?.variants?.map((item) => ({
                ...item,
                key: item.id,
                state: PRODUCT_STATE[item.state],
              })),
              columns: variantsTableColumn,
              onSelectedRow: (data) => {},
            },
            search: {
              show: false,
            },
            pagination: {
              length: product?.variants?.length,
              pageSize: 10,
              current: 1,
            },
          },
        },
      ],
    }
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <DefaultLayout
      title={"Chi tiết sản phẩm"}
      breadcrumb={[
        {
          href: "/products",
          title: "Sản phẩm",
        },
        {
          href: `/products/${id}`,
          title: product?.name || "Chi tiết sản phẩm",
        },
      ]}
      activeKey={"product-list"}
    >
      <FormView
        loading={loading}
        items={items}
        actions={actions}
        title={product?.name}
      />
    </DefaultLayout>
  );
}
