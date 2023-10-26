import { H5, FormGroup, InputGroup, Button, Intent } from '@blueprintjs/core';
import React, { useState }                           from 'react';

const initialState = {
  items: [],
  isEdit: false,
  isDelete: false,
  name: "",
  editIndex: -1,
};
const TodoList = ()=>{
  const [state, setState] = useState(initialState);

  const addItem = () => {
    const prevItems = [...state.items];
    if (state.isEdit) {
      prevItems[state.editIndex].name = state.name;
      setState((prev) => {
        return {
          ...prev,
          items: prevItems,
          name: "",
          isEdit: false,
        };
      });
    } else {
      prevItems.push({ id: state.items.length + 1, name: state.name });
      setState((prev) => {
        return {
          ...prev,
          items: prevItems,
          name: "",
        };
      });
    }
  };

  const onChangeInput = (event) => {
    const { name = "", value = "" } = event.target;
    setState((prev) => {
      return {
        ...prev,
        name: value,
      };
    });
  };

  const deleteItem = (deleteItemIndex) => {
    if (window.confirm("Are you sure you want to delete")) {
      const prevItems = [...state.items];
      const filtered = prevItems.filter(
        (item, index) => index !== deleteItemIndex
      );

      setState((prev) => {
        return {
          ...prev,
          items: filtered,
        };
      });
    }
  };

  const onEdit = (editIndex) => {
    const prevItems = [...state.items];
    const item = prevItems.find((item, index) => index === editIndex);
    setState((prev) => {
      return {
        ...prev,
        isEdit: true,
        name: item.name,
        editIndex,
      };
    });
  };


  return <div
    style={{
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      margin: "20px 0px 20px 20px",
    }}
  >
    <div>
      <H5>Todo App for Items</H5>
      <FormGroup
        label="Item Name"
        labelFor="text-input"
        labelInfo={<span style={{ color: "red" }}>*</span>}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <InputGroup
            value={state.name}
            name="name"
            placeholder="Enter Name of Item"
            onChange={(e) => onChangeInput(e)}
          />
          <Button
            onClick={addItem}
            intent={Intent.PRIMARY}
            disabled={!state.name.length > 0}
          >
            {state.isEdit ? "Update" : "Save"}
          </Button>
        </div>
      </FormGroup>
    </div>

    <div>
      {state.items.length > 0 &&
        state.items.map((item, index) => {
          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <H5>{item.name}</H5>
              <div>
                <Button
                  style={{ marginLeft: "10px" }}
                  intent={Intent.SUCCESS}
                  onClick={() => onEdit(index)}
                >
                  Edit
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  intent={Intent.DANGER}
                  onClick={() => deleteItem(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  </div>
}

export default TodoList;