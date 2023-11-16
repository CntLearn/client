import { InputGroup, Button }                          from '@blueprintjs/core';
import React, { useState, useEffect }                  from 'react';
import { useSelector, useDispatch }                    from 'react-redux';
import Select                                          from 'react-select';
import Tasks                                           from './Tasks';
import Crud                                            from './Crud';
import { fetchAllTodos, add, deletePermanent, update } from '../../redux/todo';

const initialState = {
  currentTodo: '',
  currentUserId: JSON.parse(localStorage.getItem('user'))?.id || '',
  selectedUser: '',
  mode: ''
};
const option = [
  { value: '', label: 'Filters' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const tasksStatus = [
  { value: 'todo', label: 'Todo' },
  { value: 'inProgress', label: 'In Progress' },
  { value: 'codeReview', label: 'Code Review' },
  { value: 'deployedForTesting', label: 'Deployed For Testing' },
  { value: 'testing', label: 'Testing' },
  { value: 'done', label: 'Done' },
  { value: 'released', label: 'Released' }
];

const TodoList = () => {
  const [state, setState] = useState(initialState);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  let users = useSelector(state => state.users) || [];
  let todos = useSelector(state => state.todos.todos) || [];

  useEffect(() => {
    dispatch(fetchAllTodos())
  }, [])

  const addTask = (addObj) => {
    dispatch(add(addObj))
      .then(res => {
        if (res) onCloseCrud();
      })
  };

  const onDelete = (todo) => {
    setState(prev => {
      return {
        ...prev,
        mode: 'delete',
        currentTodo: todo
      }
    })
  };

  const onDeleteSuccess = () => {
    dispatch(deletePermanent(state.currentTodo._id))
  }

  const onUpdate = (todo) => {
    setState(prev => {
      return {
        ...prev,
        mode: 'edit',
        currentTodo: todo
      }
    })
  }

  const onUpdateSuccess = (id, todo) => {
    dispatch(update(id, todo))
  }

  const onCloseCrud = () => {
    setState(initialState)
  }

  return (<div style={ {
    background: '#f0f5fa',
    height: '100vh',
    width: '93vw',

  } }>
    {/*// top create bar,*/ }
    <div
      style={ {
        textAlign: 'right',
        padding: '1rem 1rem 0rem 0rem'
      } }
    >
      <Button
        onClick={ () => {
          setState(prev => ({
            ...prev,
            mode: 'add'
          }))
        } }
      >
        Create Task
      </Button>
    </div>

    <Crud
      isOpen={ !!state.mode }
      onClose={ onCloseCrud }
      onAdd={ addTask }
      onDelete={ onDeleteSuccess }
      onEdit={ onUpdateSuccess }
      parentState={ state }
    />

    {/*// below bar*/ }
    <div
      style={ {
        paddingLeft: '1rem'
      } }
    >

      <div style={ { display: 'flex' } }>

        <div
          style={ { width: '200px', height: '40px' } }
        >
          <InputGroup
            value={ search }
            name="name"
            placeholder="search..."
            leftIcon={ 'search' }
            onChange={ (e) => {
              setSearch(e.target.value)
            } }
            style={ { padding: '15px 10px' } }
          />
        </div>

        <div style={ { marginLeft: '1rem', width: '200px' } }>
          <Select
            options={ Array.isArray(users) && users.length > 0 ? [
              { value: '', label: 'None' },
              ...users.map(user => ({
                label: user.fullName,
                value: user._id
              }))
            ] : [] }

            value={ state.selectedUser }
            placeholder={ 'Select User' }
            defaultValue={ { value: '', label: 'None' } }
            isSearchable={ true }
            onChange={ (e) => {
              setState(prev => {
                return {
                  ...prev,
                  selectedUser: e
                }
              })
            } }
          />
        </div>

        <div style={ { marginLeft: '1rem', width: '200px' } }>
          <Select
            options={ option }
            value={ option[0] }
            isSearchable={ true }
          />
        </div>
      </div>

      <div
        style={ {
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          gap: '0.8rem',
          overflowX: 'auto',
          marginTop: '2rem',
          height: '100vh'
        } }
      >
        {
          tasksStatus.map(task => {
            return <div
              key={ task.value }
              style={ {
                width: '350px',
                background: '#e0e5e8',

              } }
            >
              <Tasks
                taskStatus={ task.label }
                array={
                  search.length > 0 ?
                    Array.isArray(todos) && todos.length > 0 ? todos.filter(todo => (todo.title.includes(search) && todo.status === task.value)) : []
                    : Array.isArray(todos) && todos.length > 0 ? todos.filter(todo => todo.status === task.value) : []
                }
                onDelete={ onDelete }
                onUpdate={ onUpdate }
              />
            </div>
          })
        }
      </div>
    </div>
  </div>);
  /*
   return <div
   style={ {
   display: "flex",
   alignItems: "center",
   flexDirection: "column",
   margin: "20px 0px 20px 20px",
   } }
   >
   <div>
   <H5>Tod App for Items</H5>

   <FormGroup
   label="Item Name"
   labelFor="text-input"
   labelInfo={ <span style={ { color: "red" } }>*</span> }
   >
   <div style={ { display: "flex", gap: "10px" } }>
   <InputGroup
   value={ state.name }
   name="name"
   placeholder="Enter Name of Item"
   onChange={ (e) => onChangeInput(e) }
   />
   <Button
   onClick={ addItem }
   intent={ Intent.PRIMARY }
   disabled={ !state.name.length > 0 }
   >
   { state.isEdit ? "Update" : "Save" }
   </Button>
   </div>
   </FormGroup>
   </div>

   <div>
   { state.items.length > 0 &&
   state.items.map((item, index) => {
   return (
   <div
   key={ item.id }
   style={ {
   display: "flex",
   gap: "10px",
   marginBottom: "20px",
   } }
   >
   <H5>{ item.name }</H5>
   <div>
   <Button
   style={ { marginLeft: "10px" } }
   intent={ Intent.SUCCESS }
   onClick={ () => onEdit(index) }
   >
   Edit
   </Button>
   <Button
   style={ { marginLeft: "10px" } }
   intent={ Intent.DANGER }
   onClick={ () => deleteItem(index) }
   >
   Delete
   </Button>
   </div>
   </div>
   );
   }) }
   </div>
   </div>

   */
}

export default TodoList;