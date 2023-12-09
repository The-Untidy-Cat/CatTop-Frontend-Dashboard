import { DatePicker, Pagination, Table, Input, Select } from "antd";
import { ModalToggle } from "@/components/Modal";

const { Search } = Input;
const { RangePicker } = DatePicker;

export default function TableView({
  title,
  actions = [],
  addonBefore,
  table = {
    bordered: true,
    loading: false,
    data: [],
    columns: [],
    onSelectedRow: (data) => {},
  },
  search = {
    placeholder: "Tìm kiếm",
    show: true,
    onSearch: (value) => {},
  },
  filter = {
    show: false,
    options: [],
    onChange: (value) => {},
  },
  datePicker = {
    show: false,
    onChange: (date, dateString) => {},
  },
  pagination = {
    show: true,
    length,
    pageSize: 10,
    current: 1,
    onChange: (page, pageSize) => {},
  },
}) {
  return (
    <>
      <div className="flex flex-wrap gap-2 justify-start items-center align-center mb-2">
        {actions?.map((action) => {
          return (
            <ModalToggle
              button={{
                size: action.buttonSize || "small",
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
      <div className="flex flex-col gap-1 bg-white p-5 w-full h-fit min-h-full border rounded">
        {title && <h2 className="text-lg font-semibold shrink-0">{title}</h2>}
        {addonBefore}
        <div className="flex flex-col gap-2 md:flex-row justify-between items-center align-center">
          {datePicker?.show && (
            <RangePicker onChange={datePicker?.onChange} className="w-full" format={"DD/MM/YYYY"}/>
          )}
          <div className="flex flex-row w-full gap-1">
            {filter?.show && (
              <Select
                className="w-full max-w-sm"
                onChange={filter?.onChange}
                options={filter?.options}
                placeholder="Lọc"
              />
            )}
            {search?.show && (
              <Search
                type="search"
                name="search"
                placeholder={search?.placeholder}
                onSearch={search?.onSearch}
                className="w-full"
              />
            )}
          </div>
        </div>
        <div className="block w-full h-fit">
          <Pagination
            size="small"
            showLessItems={true}
            showTotal={(total, range) => `${range[0]}-${range[1]}/${total}`}
            total={pagination?.length}
            pageSize={pagination?.pageSize}
            current={pagination?.current}
            onChange={pagination?.onChange}
            className="w-fit float-right"
          />
        </div>
        <Table
          size="small"
          scroll={{ x: "max-content" }}
          dataSource={table?.data}
          columns={table?.columns}
          pagination={false}
          onRow={(data, index) => {
            return {
              onClick: () => {
                table?.onSelectedRow(data);
              },
            };
          }}
          loading={table?.loading}
          className="w-full h-full min-h-full"
        />
      </div>
    </>
  );
}
