import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import AddUser from './AddUser'
import User from './User'

export const Users = () => {
  const context = useContext(UserContext);
  return (
    <div className="cards-grid">
      {context.isAddUserOpen && <AddUser />}
      {context.users.map(c => (
        <User key={c.id} user={c} />
      ))}
    </div>
  )
}