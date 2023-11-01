import React, { useState, useCallback } from "react";
import { Intent, Button }               from "@blueprintjs/core";
import ShowList                         from "./ShowList";
import Cruds                            from "./Cruds";

const array = [
  { id: 1, username: "zain 1", email: "zain@gmail.com" },
  { id: 2, username: "zain 1", email: "zain@gmail.com" },
  { id: 3, username: "zain 1", email: "zain@gmail.com" },
  { id: 4, username: "zain 1", email: "zain@gmail.com" },
  { id: 5, username: "zain 1", email: "zain@gmail.com" },
  { id: 6, username: "zain 1", email: "zain@gmail.com" },
  { id: 7, username: "zain 1", email: "zain@gmail.com" },
  { id: 8, username: "zain 1", email: "zain@gmail.com" },
  { id: 9, username: "zain 1", email: "zain@gmail.com" },
  { id: 10, username: "zain 1", email: "zain@gmail.com" },
  { id: 11, username: "zain 1", email: "zain@gmail.com" },
  { id: 12, username: "zain 1", email: "zain@gmail.com" },
  { id: 13, username: "zain 1", email: "zain@gmail.com" },
];

const initialState = {
  mode: "",
  id: -1,
};
const Add_Edit = () => {
  const [state, setState] = useState(initialState);
  const [tableData, setTableData] = useState(array);
  // useEffect(() => {
  // getTableList();
  // }, [state]);

  const getTableList = () => {
    console.log("calling get tbl list");
    const tableList =
      Array.isArray(tableData) &&
      tableData.length > 0 &&
      tableData.map((list) => {
        return {
          ...list,
          actions: (
            <div key={ list.id }>
              <Button
                intent={ Intent.PRIMARY }
                onClick={ () => {
                  setState((prev) => {
                    return {
                      ...prev,
                      id: list.id,
                      mode: "edit",
                    };
                  });
                  console.log("calling edit");
                } }
              >
                Edit
              </Button>
              <Button
                intent={ Intent.SUCCESS }
                style={ { margin: "0px 10px" } }
                onClick={ () => {
                  setState((prev) => {
                    return {
                      ...prev,
                      id: list.id,
                      mode: "view",
                    };
                  });
                  console.log("calling view");
                } }
              >
                View
              </Button>
              <Button
                intent={ Intent.DANGER }
                onClick={ () => {
                  setState((prev) => {
                    return {
                      ...prev,
                      id: list.id,
                      mode: "delete",
                    };
                  });
                  console.log("calling delete");
                } }
              >
                Delete
              </Button>
            </div>
          ),
        };
      });
    return tableList;
    setTableData(tableList);
  };
  const setTableList = (tableList) => {
    setTableData(tableList);
  };
  const onCloseCrud = () => {
    setState(initialState);
  };

  const onDelete = () => {
    const requiredList =
      Array.isArray(tableData) &&
      tableData.length > 0 &&
      tableData.filter((list) => list.id !== state.id);
    setTableList(requiredList);
    onCloseCrud();
  };

  const onUpdate = (username, email) => {
    const requiredList =
      Array.isArray(tableData) &&
      tableData.length > 0 &&
      tableData.map((list) => {
        if (list.id === state.id) {
          return {
            ...list,
            username: username,
            email: email,
          };
        }
        else {
          return list;
        }
      });

    setTableList(requiredList);
    onCloseCrud();
  };

  const onSave = useCallback(
    (username, email) => {
      const prevList =
        Array.isArray(tableData) && tableData.length > 0 ? [...tableData] : [];
      const listData = {
        id: prevList.length + 1,
        username,
        email,
      };
      prevList.push(listData);
      setTableList(prevList);
      onCloseCrud();
    },
    [tableData]
  );
  const onChangeState = (data) => {
    setState((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  };
  return (
    <div
      style={ {
        width: "1000px",
        margin: "auto",
        marginTop: "10px",
      } }
    >
      <ShowList tableData={ tableData } onChangeState={ onChangeState }/>

      {
        <Cruds
          parentState={ state }
          list={ tableData }
          onClose={ onCloseCrud }
          onSave={ onSave }
          onUpdate={ onUpdate }
          onDelete={ onDelete }
        />
      }

    </div>
  );
};

export default Add_Edit;
