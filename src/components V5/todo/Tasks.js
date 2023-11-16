import { Button, Intent, Icon } from '@blueprintjs/core';
import React                    from 'react';

const Tasks = ({
                 taskStatus,
                 array = [],
                 onDelete = () => {
                   console.log('onDelete')
                 },
                 onUpdate = () => {
                   console.log('on update')
                 }
               }) => {

  return <div>
    <div style={ {
      background: '#9ca5ac',
      textAlign: 'center',
      height: '40px',
      paddingTop: '10px',
    } }>
      <b>{ taskStatus }</b>
    </div>

    <div
      style={ {
        overflowY: 'auto',
        height: '80vh'
      } }
    >
      {
        array.map((todo) => {
          return <div
            style={ {
              height: '100px',
              background: 'white',
              margin: '10px 5px 5px 5px',
              borderRadius: '5px',
              padding: '10px',
              textWrap: 'nowrap',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            } }
            key={ todo._id }
          >
            <div>
              { todo.title }
            </div>
            <div style={ { display: 'flex', flexFlow: 'row-reverse' } }>
              <Button intent={ Intent.PRIMARY } small={ true } onClick={ () => onUpdate(todo) }> <Icon icon={ 'edit' }/>
              </Button>
              &nbsp;
              <Button intent={ Intent.DANGER } small={ true } onClick={ () => onDelete(todo) }> <Icon
                icon={ 'trash' }/> </Button>
            </div>
          </div>
        })
      }
    </div>
  </div>
}

export default Tasks;