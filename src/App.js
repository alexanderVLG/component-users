import React, { useEffect, useState } from 'react';
import { Success } from './components/Success';
import { Users } from './components/Users/index';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch(`https://reqres.in/api/users`)
    .then(response => response.json())
    .then((json) => {
      setUsers(json.data);
    })
    .catch((error) => {
      console.warn(error);
      alert('Ошибка при получении пользователей')
    })
    .finally(() => setLoading(false));
  }, [])

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  }

  const onClickInvite = (id) => {
    if(invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id ));
    } else {
      setInvites(prev => [...prev, id]);
    }
  }

  const onClickSendInvites = () => {
    setSuccess(true);
  }

  return (
    <div className="users__container">
      {success ? (
        <Success count={invites.length}/> 
      ) : (
        <Users 
        onChangeSearchValue={onChangeSearchValue}
        searchValue={searchValue} 
        items={users} 
        isLoading={isLoading}
        invites={invites} 
        onClickInvite={onClickInvite}
        onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
