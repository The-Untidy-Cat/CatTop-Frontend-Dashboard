import { Descriptions, Skeleton,  Tabs } from "antd";
import { ModalToggle } from "../Modal";
import TableView from "./table";

const PageItem = ({ type, label = null, items }) => {
  switch (type) {
    case "description":
      return <Descriptions title={label} layout="vertical" items={items} size="small" />;
    case "table":
      return <TableView {...items} />;
    default:
      return items;
  }
};

export default function FormView({
  loading = false,
  title = null,
  actions,
  items = [
    {
      key,
      label,
      children: [
        {
          type,
          key,
          label,
          items: [],
        },
      ],
    },
  ],
}) {
  return (
    <Skeleton loading={loading}>
      <div className="flex flex-wrap gap-2 justify-start items-center align-center mb-2">
        {actions.map((action) => {
          return (
            <ModalToggle
              button={{
                size: action.buttonSize,
                label: action.buttonLabel,
                type: action.buttonType,
                icon: action.buttonIcon,
              }}
              modal={{
                title: action.title,
                ...action.modalProps,
              }}
              key={action.key}
            >
              {action.children}
            </ModalToggle>
          );
        })}
      </div>
      <div className="flex flex-col gap-0.5 bg-white p-5 w-full h-fit min-h-full border rounded">
        {title && <h2 className="text-lg font-semibold shrink-0">{title}</h2>}
        <Tabs
          items={items.map((item) => {
            return {
              ...item,
              children: item?.children?.map((child) => {
                return (
                  <PageItem
                    items={child?.items}
                    key={child?.key}
                    label={child?.label}
                    type={child?.type}
                  />
                );
              }),
            };
          })}
        />
      </div>
    </Skeleton>
  );
}
