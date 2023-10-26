import {
  Icon,
  Intent,
  FormGroup,
  InputGroup,
  Button,
  Dialog,
  Classes,
} from "@blueprintjs/core";

import React, { useEffect, useState } from "react";
// mode = create, edit, view, delete
const Cruds = ({
  parentState = {},
  list = [],
  setTableList = () => {
    console.log("set table list");
  },
  onClose = () => {
    console.log("on close");
  },
  onSave = () => {
    console.log("on save");
  },
  onUpdate = () => {
    console.log("on onUpdate");
  },
  onDelete = () => {
    console.log("on onDelete");
  },
}) => {
  console.log("cruds rendered");
  const [state, setState] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (parentState.id >= 0) {
      const requiredList = list.find((list) => list.id === parentState.id);
      setState((prev) => {
        return {
          ...prev,
          id: requiredList.id,
          username: requiredList.username,
          email: requiredList.email,
        };
      });
    }
    return () => {
      setState((prev) => {
        return {
          ...prev,
          username: "",
          email: "",
        };
      });
    };
  }, [parentState]);

  const onChangeInput = (event) => {
    const { name = "", value = "" } = event.target;

    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSave1 = () => {
    const prevList = Array.isArray(list) && list.length > 0 ? [...list] : [];
    const { username, email } = state;
    const listData = {
      username,
      email,
      id: prevList.length,
    };
    prevList.push(listData);
    setTableList(prevList);
    onClose();
  };

  const onDelete1 = () => {
    const requiredList =
      Array.isArray(list) &&
      list.length > 0 &&
      list.filter((list) => list.id !== parentState.id);

    setTableList(requiredList);
    onClose();
  };
  const onUpdate1 = () => {
    const requiredList =
      Array.isArray(list) &&
      list.length > 0 &&
      list.map((list) => {
        if (list.id === parentState.id) {
          return {
            ...list,
            username: state.username,
            email: state.email,
          };
        } else {
          return list;
        }
      });
    setTableList(requiredList);
    onClose();
  };

  return (
    <div>
      <Dialog
        isOpen={!!parentState.mode && parentState.mode.length > 0}
        onClose={onClose}
        title={
          !!parentState.mode && parentState.mode === "create"
            ? "Create List"
            : !!parentState.mode && parentState.mode === "delete"
            ? "Delete List"
            : !!parentState.mode && parentState.mode === "view"
            ? "View List"
            : "Update List"
        }
        icon={
          !!parentState.mode && parentState.mode === "create"
            ? "create"
            : !!parentState.mode && parentState.mode === "delete"
            ? "cross"
            : !!parentState.mode && parentState.mode === "view"
            ? "info-sign"
            : "edit"
        }
      >
        <div className={Classes.DIALOG_BODY}>
          {!!parentState.mode && parentState.mode === "delete" ? (
            <div>Are you sure you want to delete the {state.username}</div>
          ) : (
            <div>
              <FormGroup
                //   helperText="Helper text with details..."
                label="User Name"
                labelFor="text-input"
                labelInfo={
                  <Icon icon="asterisk" intent={Intent.DANGER} size={14} />
                }
                disabled={!!parentState.mode && parentState.mode === "view"}
              >
                <InputGroup
                  id="text-input"
                  placeholder="Enter Username"
                  disabled={!!parentState.mode && parentState.mode === "view"}
                  onChange={onChangeInput}
                  name="username"
                  value={state.username}
                />
              </FormGroup>
              <FormGroup
                //   helperText="Helper text with details..."
                label="Email"
                labelFor="text-input"
                labelInfo={
                  <Icon icon="asterisk" intent={Intent.DANGER} size={14} />
                }
                disabled={!!parentState.mode && parentState.mode === "view"}
              >
                <InputGroup
                  id="text-input"
                  placeholder="Enter Email"
                  disabled={!!parentState.mode && parentState.mode === "view"}
                  onChange={onChangeInput}
                  name="email"
                  value={state.email}
                />
              </FormGroup>
            </div>
          )}
        </div>
        <div
          style={{
            textAlign: "right",
            margin: "10px",
          }}
          className={Classes.DIALOG_FOOTER}
        >
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button intent={Intent.DANGER} onClick={!!onClose && onClose}>
              Cancel
            </Button>
            {!!parentState.mode && parentState.mode !== "view" && (
              <Button
                style={{
                  marginLeft: "10px",
                }}
                intent={Intent.PRIMARY}
                onClick={
                  !!parentState.mode && parentState.mode === "create"
                    ? () => onSave(state.username, state.email)
                    : !!parentState.mode && parentState.mode === "delete"
                    ? () => onDelete()
                    : () => onUpdate(state.username, state.email)
                }
                disabled={
                  !!parentState.mode &&
                  parentState.mode !== "delete" &&
                  !(!!state.username.length > 0 && !!state.email.length > 0)
                }
              >
                {!!parentState.mode && parentState.mode === "create"
                  ? "Create"
                  : !!parentState.mode && parentState.mode === "delete"
                  ? "Delete"
                  : "Update"}
              </Button>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Cruds;
