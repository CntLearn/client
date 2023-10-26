import React from "react";
import { Intent, Button } from "@blueprintjs/core";
import listStyles from "../styles/showListData.module.css";
const ShowList = ({
  tableData = [],
  onChangeState = () => {
    console.log("calling onChangeState");
  },
}) => {
  console.log("show list render");
  return (
    <div>
      <div
        style={{
          textAlign: "right",
          margin: "0px 0px 10px 0px",
        }}
      >
        <Button onClick={() => onChangeState({ mode: "create" })}>
          Add New List
        </Button>
      </div>

      <table className={listStyles.table}>
        <thead>
          <tr className={listStyles.tr}>
            <th className={listStyles.th} style={{ width: "7%" }}>
              ID
            </th>
            <th className={listStyles.th} style={{ width: "25%" }}>
              User Name
            </th>
            <th className={listStyles.th} style={{ width: "45%" }}>
              Email
            </th>
            <th className={listStyles.th} style={{ width: "23%" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((list) => {
            return (
              <tr className={listStyles.tr} key={list.id}>
                <td className={listStyles.td}> {list.id} </td>
                <td className={listStyles.td}>{list.username}</td>
                <td className={listStyles.td}>{list.email}</td>
                <td className={listStyles.td} style={{ textAlign: "center" }}>
                  <div>
                    <Button
                      intent={Intent.PRIMARY}
                      onClick={() =>
                        onChangeState({ id: list.id, mode: "edit" })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      intent={Intent.SUCCESS}
                      style={{ margin: "0px 10px" }}
                      onClick={() =>
                        onChangeState({ id: list.id, mode: "view" })
                      }
                    >
                      View
                    </Button>
                    <Button
                      intent={Intent.DANGER}
                      onClick={() =>
                        onChangeState({ id: list.id, mode: "delete" })
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShowList;
