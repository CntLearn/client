import {
  Dialog,
  DialogFooter,
  DialogBody,
  FormGroup,
  InputGroup,
  Button,
  Intent,
  TextArea,
  Classes,
  Popover, Position
}                                     from '@blueprintjs/core';
import { DatePicker3, DateInput3 }    from "@blueprintjs/datetime2";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import Select                         from 'react-select';
import { fetchAll }                   from '../../redux/users';
import moment                         from 'moment';
import { tasksStatus, priorityList }  from './utils';
// import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

import '@blueprintjs/core/lib/css/blueprint.css';

const initialState = {
  title: '',
  description: '',
  status: '',
  assignedBy: '',
  due_date: '',
  priority: '',
  tags: '',
  assingedTo: '',
  comments: '',
  attachments: [],
  reminder: '',
  isArchive: '',
  completeStatus: '',
  createdBy: '',
  createdAt: '',
  updatedBy: '',
  updatedAt: '',
  start_date: '',
  end_date: '',
  subTasks: [],
  test: moment(new Date()).format('dddd, MMMM D YYYY'),
  date: new Date(),
}
// 600, , 80*60
const Crud = (props) => {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch()

  const users = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchAll());
  }, [])

  useEffect(() => {
    if (props.parentState.mode === 'edit') {
      const editObj = {
        ...props.parentState.currentTodo,
        status: tasksStatus.find(t => t.value === props.parentState.currentTodo.status),
        priority: priorityList.find(p => p.value === props.parentState.currentTodo.priority),
      }
      setState(prev => {
        return {
          ...prev,
          ...editObj
        }
      })
    }
  }, [props.parentState])

  const onChangeInput = (e) => {
    const { value, name } = e.target;
    setState(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const onAdd = () => {
    const localData = JSON.parse(localStorage.getItem('user'));

    const addObj = {
      title: state.title,
      description: state.description ? state.description : '',
      status: !!state.status.value ? state.status.value : 'todo',
      assignedBy: localData.id,
      due_date: state.due_date ? state.due_date : '',
      priority: !!state.priority.value ? state.priority.value : '',
      // assignedTo is required as mongo does not accept null or empty string for poplate.
      // so while creating a task assign creator task and then will be update.
      // assingedTo: !!state.assingedTo.value ? state.assingedTo.value : '',
      assingedTo: localData.id,
      reminder: state.reminder ? state.reminder : '',
      isArchive: !!state.isArchive.value ? state.isArchive.value : 0,
      isDeleted: !!state.isDeleted?.value ? state.isDeleted.value : 0,
      completeStatus: !!state.completeStatus.value ? state.completeStatus.value : '',
      createdBy: localData.id,
      updatedBy: localData.id,
      start_date: state.start_date ? state.start_date : '',
      end_date: state.end_date ? state.end_date : '',
    }

    props.onAdd(addObj);
  }

  const onEdit = () => {
    const localData = JSON.parse(localStorage.getItem('user'));

    const editObj = {
      title: state.title,
      description: state.description ? state.description : '',
      status: !!state.status.value ? state.status.value : 'todo',
      assignedBy: localData.id,
      due_date: state.due_date ? state.due_date : '',
      priority: !!state.priority.value ? state.priority.value : '',
      assingedTo: localData.id,
      reminder: state.reminder ? state.reminder : '',
      isArchive: !!state.isArchive.value ? state.isArchive.value : 0,
      isDeleted: !!state.isDeleted?.value ? state.isDeleted.value : 0,
      completeStatus: !!state.completeStatus.value ? state.completeStatus.value : '',
      updatedBy: localData.id,
      updatedAt: new Date(),
      start_date: state.start_date ? state.start_date : '',
      end_date: state.end_date ? state.end_date : '',
    }

    props.onEdit(props.parentState.currentTodo._id, editObj);
  }

  return <Dialog
    isOpen={ props.isOpen }
    onClose={ () => {
      props.onClose();
      setState(initialState)
    } }
    title={ props.parentState.mode === 'add' ? 'Create' : props.parentState.mode === 'edit' ? 'Update' : 'Delete' }
    style={ { maxHeight: '90vh', width: props.parentState.mode === 'delete' ? '35vw' : '60vw' } }
    icon={ props.parentState.mode === 'add' ? 'add' : props.parentState.mode === 'edit' ? 'edit' : 'trash' }
  >
    <DialogBody>
      {
        props.parentState.mode === 'delete' ? <div>
            Are you sure you want to remove Permanent <b> { props.parentState.currentTodo.title } </b> ?
          </div> :
          <div>
            <FormGroup
              label="Title"
              labelFor="text-input"
              labelInfo={ <span style={ { color: "red" } }>*</span> }
            >
              <div style={ { display: "flex", gap: "10px" } }>
                <InputGroup
                  value={ state.title }
                  name="title"
                  placeholder="Enter Title"
                  onChange={ (e) => onChangeInput(e) }
                />
              </div>
            </FormGroup>

            {/*<DateInput3*/ }
            {/*// dateFnsFormat={'MM/dd/yyyy'}*/ }
            {/*locale={DateInput3.defaultProps.locale}*/ }
            {/*popoverProps={{ placement: "top" }}*/ }
            {/*/>*/ }

            {
              /// DateInput3
            }

            <div style={ { display: "flex", flexDirection: "column" } }>
              <b> Date</b>
              <Popover
                onInteraction={ isDateTimeOpen => {
                  setState({ ...state, isDateTimeOpen })
                } }
                // isOpen={ true }
                isOpen={ state?.isDateTimeOpen }
                fill={ true }
                position={ Position.RIGHT_TOP }
              >

                <InputGroup
                  value={ state.date ? state.date : '' }
                  onChange={ () => setState({ ...state, isDateTimeOpen: true }) }
                  fill={ true }
                />
                {/*
                 <DateInput3
                 date={new Date()}
                 label={'Date to click'}
                 maxDate={new Date(2050, 1, 1)}
                 minDate={new Date(1950, 1, 1)}
                 style={ {
                 height: "2rem",
                 } }
                 parseDate={ (str) => new Date(str) }
                 formatDate={ (date) => date.toLocaleString() }
                 value={ state.date }
                 onChange={ (e) => {
                 console.log('eeee: ', e)
                 if (moment(e).format("YYYY-MM-DD") !== "Invalid date") {
                 setState(prevState => {
                 return {
                 ...prevState,
                 date: e
                 }
                 })
                 }
                 } }
                 />
                 */
                }


                <DatePicker3
                  style={ {
                    height: "2rem",
                  } }
                  className={ Classes.ELEVATION_3 }
                  timePickerProps={ { useAmPm: true, showArrowButtons: true } }
                  dayPickerProps={ { showOutsideDays: true, showWeekNumber: true } }
                  showTimeArrowButtons={ true }
                  onChange={ (e) => {
                    console.log('eeee: ', e)
                    if (moment(e).format("YYYY-MM-DD") !== "Invalid date") {
                      setState(prevState => {
                        return {
                          ...prevState,
                          date: moment(e).format('DD-MM-YYYY hh:mm:ss a'),
                          isDateTimeOpen:false
                        }
                      })
                    }
                  } }
                />

              </Popover>

            </div>

            {
              ////
            }

            {
              /*
               <DatePicker3
               // dateFnsFormat={'MM/dd/yyyy'}
               locale={ DateInput3.defaultProps.locale }
               // dateFnsLocaleLoader={}
               className={ Classes.ELEVATION_4 }
               timePickerProps={ { useAmPm: true, showArrowButtons: true } }
               dayPickerProps={ { showOutsideDays: true, showWeekNumber: true } }
               showTimeArrowButtons={ true }
               style={ {
               padding: '20px'
               } }
               onChange={ (e) => {
               console.log('eeee: ', e)
               if (moment(e).format("YYYY-MM-DD") !== "Invalid date") {
               setState(prevState => {
               return {
               ...prevState,
               date: e
               }
               })
               }
               } }
               />
               */
            }

            <FormGroup
              label="Description"
              labelFor="text-input"
            >
              <div style={ { display: "flex", gap: "10px", width: '100%' } }>
                <TextArea
                  value={ state.description }
                  name="description"
                  placeholder="Enter Description"
                  onChange={ (e) => onChangeInput(e) }
                  style={ { width: '100%' } }
                />
              </div>
            </FormGroup>

            <FormGroup
              label="Status"
              labelFor="text-input"
            >
              <div style={ { width: '200px' } }>
                <Select
                  value={ state.status }
                  options={ tasksStatus }
                  name="status"
                  placeholder="Select status"
                  onChange={ (e) => {
                    setState(prev => {
                      return {
                        ...prev,
                        status: e
                      }
                    })
                  } }
                />
              </div>
            </FormGroup>

            <FormGroup
              label="User (Assignee)"
              labelFor="text-input"
            >
              <div style={ { width: '200px' } }>
                <Select
                  value={ state.assingedTo }
                  options={ Array.isArray(users) && users.length > 0 ? [
                    { value: '', label: 'None' },
                    ...users.map(user => ({
                      label: user.fullName, value: user._id
                    }))
                  ] : [] }
                  name="status"
                  placeholder="Select Assignee"
                  onChange={ (e) => {
                    console.log('eeee : ', e)
                    setState(prev => {
                      return {
                        ...prev,
                        assingedTo: e
                      }
                    })
                  } }

                />
              </div>
            </FormGroup>


            <FormGroup
              label="Test"
              labelFor="text-input"
            >
              <div style={ { width: '205px' } }>
                <InputGroup
                  type={ 'datetime-local' }
                  value={ state.test.toString().substring(0, 16) }
                  name="due_date"
                  placeholder="Select Due Date"
                />
              </div>
            </FormGroup>

            <FormGroup
              label="Due Date"
              labelFor="text-input"
            >
              <div style={ { width: '205px' } }>
                <InputGroup
                  type={ 'date' }
                  value={ state.due_date }
                  name="due_date"
                  placeholder="Select Due Date"
                  onChange={ (e) => onChangeInput(e) }
                />
              </div>
            </FormGroup>

            <FormGroup
              label="Priority"
              labelFor="text-input"
            >
              <div style={ { width: '200px' } }>
                <Select
                  value={ state.priority }
                  options={ priorityList }
                  name="priority"
                  placeholder="Select Priority"
                  onChange={ (e) => {
                    setState(prev => {
                      return {
                        ...prev,
                        priority: e
                      }
                    })
                  } }
                />
              </div>
            </FormGroup>

            <FormGroup
              label="Reminder Date"
              labelFor="text-input"
            >
              <div style={ { width: '205px' } }>
                <InputGroup
                  type={ 'datetime-local' }
                  value={ state.reminder }
                  name="reminder"
                  placeholder="Select Due Date"
                  onChange={ (e) => onChangeInput(e) }
                />
              </div>
            </FormGroup>

            <FormGroup
              label="Start Date"
              labelFor="text-input"
            >
              <div style={ { width: '205px' } }>
                <InputGroup
                  type={ 'datetime-local' }
                  value={ state.start_date }
                  name="start_date"
                  placeholder="Select Start Date"
                  onChange={ (e) => onChangeInput(e) }
                />
              </div>
            </FormGroup>

            <FormGroup
              label="End Date"
              labelFor="text-input"
            >
              <div style={ { width: '205px' } }>
                <InputGroup
                  type={ 'datetime-local' }
                  value={ state.end_date }
                  name="end_date"
                  placeholder="Select End Date"
                  onChange={ (e) => onChangeInput(e) }
                />
              </div>
            </FormGroup>

          </div>
      }

    </DialogBody>

    <DialogFooter>
      <Button
        onClick={ () => {
          props.onClose();
          setState(initialState)
        } }
        intent={ Intent.DANGER }
      >
        Cancel
      </Button>
      &nbsp;
      <Button
        onClick={ props.parentState.mode === 'add' ? onAdd : props.parentState.mode === 'edit' ? onEdit : props.onDelete }
        intent={ props.parentState.mode === 'add' ? Intent.SUCCESS : props.parentState.mode === 'edit' ? Intent.PRIMARY : Intent.SUCCESS }
        disabled={ (props.parentState.mode === 'add' || props.parentState.mode === 'edit') ? !(!!state.title) : false }
      >
        { props.parentState.mode === 'add' ? 'Create' : props.parentState.mode === 'edit' ? 'Update' : 'Delete' }
      </Button>


    </DialogFooter>

  </Dialog>
}
export default Crud