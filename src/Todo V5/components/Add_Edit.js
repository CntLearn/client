import { Intent, Button } from "@blueprintjs/core";
import React, { useEffect } from "react";
import MaterialTable from "material-table";
import Cruds from "./Cruds";
import { useState } from "react";

const array = [
  { id: 1, username: "zain 1", email: "zain@gmail.com" },
  { id: 2, username: "zain 1", email: "zain@gmail.com" },
  { id: 3, username: "zain 1", email: "zain@gmail.com" },
  { id: 4, username: "zain 1", email: "zain@gmail.com" },
  { id: 5, username: "zain 1", email: "zain@gmail.com" },
  // { id: 6, username: "zain 1", email: "zain@gmail.com" },
  // { id: 7, username: "zain 1", email: "zain@gmail.com" },
  // { id: 8, username: "zain 1", email: "zain@gmail.com" },
  // { id: 9, username: "zain 1", email: "zain@gmail.com" },
  // { id: 10, username: "zain 1", email: "zain@gmail.com" },
  // { id: 11, username: "zain 1", email: "zain@gmail.com" },
  // { id: 12, username: "zain 1", email: "zain@gmail.com" },
  // { id: 13, username: "zain 1", email: "zain@gmail.com" },
];

const tableCols = [
  { title: "ID", field: "id" },
  { title: "User Name", field: "username" },
  { title: "Email", field: "email" },
  { title: "Actions", field: "actions" },
];
const initialState = {
  mode: "",
  id: -1,
};
const Add_Edit = () => {
  const [state, setState] = useState(initialState);
  const [tableData, setTableData] = useState(array);
  useEffect(() => {
    getTableList();
  }, [state]);

  const getTableList = () => {
    console.log("calling get tbl list");
    const tableList =
      Array.isArray(tableData) &&
      tableData.length > 0 &&
      tableData.map((list) => {
        return {
          ...list,
          actions: (
            <div>
              <Button
                intent={Intent.PRIMARY}
                onClick={() => {
                  setState((prev) => {
                    return {
                      ...prev,
                      id: list.id,
                      mode: "edit",
                    };
                  });
                  console.log("calling edit");
                }}
              >
                Edit
              </Button>
              <Button
                intent={Intent.SUCCESS}
                style={{ margin: "0px 10px" }}
                onClick={() => {
                  setState((prev) => {
                    return {
                      ...prev,
                      id: list.id,
                      mode: "view",
                    };
                  });
                  console.log("calling view");
                }}
              >
                View
              </Button>
              <Button
                intent={Intent.DANGER}
                onClick={() => {
                  setState((prev) => {
                    return {
                      ...prev,
                      id: list.id,
                      mode: "delete",
                    };
                  });
                  console.log("calling delete");
                }}
              >
                Delete
              </Button>
            </div>
          ),
        };
      });
    setTableData(tableList);
  };
  const setTableList = (tableList) => {
    setTableData(tableList);
  };
  const onCloseCrud = () => {
    setState(initialState);
  };
  return (
    <div
      style={{
        width: "1000px",
        margin: "auto",
      }}
    >
      <div
        style={{
          textAlign: "right",
          margin: "0px 0px 10px 0px",
        }}
      >
        <Button
          onClick={() => {
            setState((prev) => {
              return {
                ...prev,
                mode: "create",
              };
            });
            console.log("calling edit");
          }}
        >
          Add New List
        </Button>
      </div>
      <div>
        <Cruds
          parentState={state}
          list={tableData}
          setTableList={setTableList}
          onClose={onCloseCrud}
        />
      </div>

      <div>
        <MaterialTable
          title={"Users List"}
          columns={tableCols}
          data={
            Array.isArray(tableData) && tableData.length > 0 ? tableData : []
          }
          options={{
            padding: "dense",
            pageSize: 5,
            maxBodyHeight: 500,
          }}
        />
      </div>
    </div>
  );
};

export default Add_Edit;
