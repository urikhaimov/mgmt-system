import React, { useState, useContext } from 'react'
import Select from 'react-select';
import { UserContext } from '../UserContext';
import { getOptions, customSmallStyles } from '../util';

const User = ({ user = {} }) => {

  const context = useContext(UserContext);
  const options = getOptions(context.statusList);
  const currentStatus = options.filter(e => user.status === e.value);
  const [status, setStatus] = useState(null);
  if (user.length === 0) return null

  const onSelectHandler = (e) => {
    context.updateUser(user.id, e.value)
    setStatus(e);
  }

  return (
    <div
      className="card">
      <div className="card-grid">
        <div className="box1">
          {user.img ? <img src={user.img} alt={user.nane} /> : <img src='images/default.png' alt={user.name} />}
        </div>
        <div className="box2">
          <div className="name">{user.name}</div>
          <div className="status">
            <Select
              value={status ? status : currentStatus}
              onChange={onSelectHandler}
              options={options}
              menuPortalTarget={document.body}
              menuPosition={'fixed'}
              className="react-select-container"
              classNamePrefix="react-select"
              styles={customSmallStyles}
            />
          </div>
        </div>
      </div>

    </div>

  )
}
export default User;