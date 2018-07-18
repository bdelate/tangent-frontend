// react imports
import React from 'react'

// project imports
import Logout from '../../containers/Auth/Logout';
import Button from '../UI/Button';

export default (props) => {
  let displayCreateEmployee = null;
  if (props.user && props.user.rank === 'Management') {
    // displayCreateEmployeeForm
    displayCreateEmployee = (
      <Button
        domProps={{
          onClick: () => props.displayCreateEmployeeForm('new')
        }}
      >
        Create Employee
      </Button >
    )

  }
  return (
    <div>
      <Logout />
      {displayCreateEmployee}
    </div>
  )
}
