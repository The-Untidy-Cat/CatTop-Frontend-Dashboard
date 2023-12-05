import {
  DatePicker,
  Pagination,
  Table,
  Input,
} from "antd";
import { ModalToggle } from "@/components/Modal";

const { Search } = Input;

export default function TableView({
  title,
  actions,
  table = {
    bordered: true,
    loading: false,
    data: [],
    columns: [],
    onSelectedRow: (data) => {},
  },
  search = {
    placeholder: "Tìm kiếm",
    onSearch: (value) => {},
  },
  datePicker = {
    show: false,
    onChange: (date, dateString) => {},
  },
  pagination = {
    length,
    pageSize: 10,
    current: 1,
    onChange: (page, pageSize) => {},
  },
}) {
  return (
    <div className="flex flex-col gap-2 md:gap-4 bg-white p-5 w-full h-full border rounded">
      <div className="flex flex-col md:flex-row justify-between items-center align-center md:gap-5">
        <h1 className="text-2xl font-semibold shrink-0">{title}</h1>
        <div className="flex flex-col justify-between gap-1 w-full">
          {datePicker?.show && <DatePicker onChange={datePicker?.onChange} />}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 justify-start items-center align-center">
        {actions.map((action) => {
          return (
            <ModalToggle
              {...action.modalProps}
              buttonIcon={action.buttonIcon}
              buttonLabel={action.buttonLabel}
              buttonType={action.buttonType}
              title={action.title}
              key={action.key}
            >
              {action.children}
            </ModalToggle>
          );
        })}
      </div>
      <div className="flex flex-col gap-2 md:flex-row justify-between items-center align-center">
        <Search
          type="search"
          name="search"
          placeholder={search?.placeholder}
          onSearch={search?.onSearch}
          className="w-full max-w-sm"
        />
        <Pagination
          showLessItems={true}
          showTotal={(total, range) => `${range[0]}-${range[1]}/${total}`}
          total={pagination?.length}
          pageSize={pagination?.pageSize}
          current={pagination?.current}
          onChange={pagination?.onChange}
          className="w-fit shrink-0 grow-0"
        />
      </div>

      <Table
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
      />
    </div>
  );
}
