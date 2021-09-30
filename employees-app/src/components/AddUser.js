import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import Select from 'react-select';
import { getOptions, customSmallStyles } from '../util';
import UserDropzone from './UploadFile';

const AddUser = () => {
  const context = useContext(UserContext)
  const onChangeForm = context.onChangeForm;
  const userCreate = context.userCreate;
  const options = getOptions(context.statusList);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isShowError, setIsShowError] = useState(false);
  const [status, setStatus] = useState(options[0]);

  const onSelectHandler = (e) => {
    onChangeForm(e.value, 'select');
    setStatus(e);
  }

  const onNameHandler = (e) => {
    const input = e.target.value;  
    const regex = new RegExp("^[a-zA-Z ]+$");
    if (regex.test(input)) {
      setIsShowError(false);
      setIsDisabled(false)

    } else {
      setIsShowError(true);
      setIsDisabled(true);
    }
    onChangeForm(input, 'name');
  }
  return (
    <div
      className="card">
      <form id="userForm" name="userForm">
        <div className="card-grid add-user">
          <div className="box1">
            <UserDropzone />
          </div>
          <div className="box2">
            <div className="name">
              <label>Enter Employee Name</label>
              <input name="name" type='text' onChange={onNameHandler} className="name-input" placeholder="Enter Name" />
              {isShowError && <div className="name-err-msg">Please, enter name</div>}
            </div>

            <div className="status">
              <Select
                name='status'
                value={status}
                onChange={onSelectHandler}
                options={options}
                menuPortalTarget={document.body}
                menuPosition={'fixed'}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={customSmallStyles}
              />
            </div>
            <button type="button" onClick={(e) => userCreate()} disabled={isDisabled} className="btn">Create</button>
          </div>
        </div>
      </form>
    </div>)
}


export default AddUser