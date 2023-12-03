import DefaultLayout from "@/components/Layout";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import {
  DatePicker,
  Divider,
  Tabs,
  Pagination,
  Table,
  Button,
  Form,
  Input,
} from "antd";
import { ModalToggle } from "@/components/Modal";
import { useState } from "react";

const { Search } = Input;

export default function TableView({
  data,
  columns,
  title,
  actions,
  onSelectedRow,
  length,
  pageSize = 10,
  current = 1,
  showDatePicker = false,
  onSearch = (value) => {},
  onPaginationChange = (page, pageSize) => {},
  loading = false,
}) {
  return (
    <div className="flex flex-col gap-2 md:gap-4 bg-white p-5 w-full h-full border rounded">
      <div className="flex flex-col md:flex-row justify-between items-center align-center md:gap-5">
        <h1 className="text-2xl font-semibold shrink-0">{title}</h1>
        <div className="flex flex-col justify-between gap-1 w-full">
          {showDatePicker && <DatePicker />}
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
      <div className="flex flex-col md:flex-row justify-between items-center align-center">
        <Search
          type="search"
          name="search"
          placeholder="Tìm kiếm"
          onSearch={onSearch}
          className="w-full max-w-sm"
        />
        <Pagination
          showLessItems={true}
          showTotal={(total, range) => `${range[0]}-${range[1]}/${total}`}
          total={length}
          pageSize={pageSize}
          current={current}
          onChange={(page, pageSize) => {
            onPaginationChange(page, pageSize);
          }}
          className="w-fit shrink-0 grow-0"
        />
      </div>

      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        onRow={(data, index) => {
          return {
            onClick: () => {
              onSelectedRow(data);
            },
          };
        }}
        loading={loading}
      />
    </div>
  );
}
