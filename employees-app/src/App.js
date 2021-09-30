import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header';
import { Users } from './components/Users';
import SearchPanel from './components/SearchPanel';

import {
  getAllUsers,
  createUser,
  getFilteredUsers,
  getStatusList,
  updateUserStatus
} from './services/UserService'
import { UserContext } from './UserContext';

function App() {

  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  const [statusList, setStatusList] = useState([])
  const [status, setStatus] = useState('All statuses');
  const [text, setText] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [buttonText, setButtonText] = useState('Create User + ');
  const [picture, setPicture] = useState(null);


  const userCreate = (e) => {
    createUser(user)
      .then(response => {
        setStatus('All statuses');
        setText('');
        setButtonText('Create User + ');
        setIsAddUserOpen(false);
        getAllUsers().then(users => {
          setUsers(users);

        });
      });
  }
  const filterUsers = (text, status) => {
    getFilteredUsers(text, status.value).then(users => {
      setUsers(users);
      setStatus(status.value || 'All statuses');
      setText(text);

    });
  }


  const updateUser = (id, status) => {
    updateUserStatus(id, status).then(users => {
      getFilteredUsers('', status).then(users => {
        setUsers(users);
      });
    });
    setStatus(status);
  }

  useEffect(() => {
    getAllUsers().then(users => {
      setUsers(users);
      getStatusList().then(sts => {
        setStatusList(sts);
      });
    });

  }, [])

  const onChangeForm = (value, type) => {
    user.id = Math.floor((1 + Math.random()) * 0x10000);
    user.status = statusList[0];
    if (type === 'name') {
      user.name = value;
    } else if (type === 'select') {
      user.status = value;
    } else if (type === 'pic') {
      user.img = `images/${value.replace(/^.*[\\\/]/, '')}`;
      setPicture(value);
    }
    setUser(user);
  }

  const userCreateOpen = () => {
    setButtonText(!isAddUserOpen ? 'Close it -' : 'Create User + ');
    setIsAddUserOpen(!isAddUserOpen);
  }
  return (
    <UserContext.Provider value={
      {
        users,
        statusList,
        filterUsers,
        updateUser,
        onChangeForm,
        userCreate,
        userCreateOpen,
        status,
        text,
        isAddUserOpen,
        buttonText,
      }
    }>
      <div className="App">
        <Header />
        <div className="row mrgnbtm">
          <SearchPanel />
        </div>
        <div className="row mrgnbtm">
          <Users />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
