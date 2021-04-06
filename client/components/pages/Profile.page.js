import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../contexts/Auth.context";
import Menu from '../layout/Menu.layout'



const ProfilePage = (props) => {

  const { user, setUser } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [userDetails, setDetails] = useState([]);

  console.log(user)

  function updateModal() {
    modal ? setModal(false) : setModal(true);
  }

  if (!user) return (
    <div style={{ marginBottom: 50 }}>
      No user logged in. Please return to homepage and sign in.
    </div>
  )

  return (
    <div>
      <Menu />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 50, flexDirection: 'column' }}>
        <div style={{
          display: 'flex', marginTop: 100, width: 300, height: 300, backgroundColor: 'royalblue', borderRadius: 1000, flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center'
        }}>
          <label style={{ color: 'white', fontSize: 18 }}>{user[0]['first_name']}</label>
          <label style={{ color: 'white', fontSize: 18 }}>{user[0].email}</label>
          <label style={{ color: 'white', fontSize: 18 }}>ID#: {user[0].id}</label>
          <label style={{ color: 'white', fontSize: 18 }}>{user[0].role === 1 ? 'Administrator' : 'Customer'}</label>
        </div>
        <div style={{ marginTop: 20 }}>
          <button onClick={() => updateModal()}>Disable User</button>
        </div>
        <div>
          {modal ? (
            <div style={{ height: 20 }}>
              Account disabled until next login ;)
            </div>
          ) :
            (
              <div> </div>
            )}

        </div>
      </div>
    </div>
  )
};

export default ProfilePage;