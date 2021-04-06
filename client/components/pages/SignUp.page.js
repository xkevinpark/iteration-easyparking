import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

const SignUpPage = () => {
  const [newUser, setNewUser] = useState({idRole: 1});
  const history = useHistory();

  const saveHandler = (e) => {
    e.preventDefault();
    if (validatePassword) createUser(); 
  }

  const validatePassword = () => {
    return newUser.password === newUser.confirmPassword;
  }

  const createUser = () => {
    fetch(`/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        history.push('/');
      })
  }

  return (
    <div className="container signup">

      <form className="well form-horizontal" onSubmit={saveHandler} method="post" id="contact_form">
        <fieldset>

          <legend><center><h2><b>Registration Form</b></h2></center></legend><br />

          <div className="form-group">
            <label className="col-md-4 control-label">First Name</label>
            <div className="col-md-4 inputGroupContainer">
              <div className="input-group">
                <span className="input-group-addon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </span>
                <input
                  name="first_name"
                  placeholder="First Name"
                  className="form-control"
                  type="text"
                  onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* <!-- Text input--> */}

          <div className="form-group">
            <label className="col-md-4 control-label" >Last Name</label>
            <div className="col-md-4 inputGroupContainer">
              <div className="input-group">
                <span className="input-group-addon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </span>
                <input
                  name="last_name"
                  placeholder="Last Name"
                  className="form-control"
                  type="text"
                  onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                />
              </div>
            </div>
          </div>
          {/* <!-- Text input--> */}

          <div className="form-group">
            <label className="col-md-4 control-label">Email</label>
            <div className="col-md-4 inputGroupContainer">
              <div className="input-group">
                <span className="input-group-addon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                  </svg>
                </span>
                <input
                  name="email"
                  placeholder="youremail@email.com"
                  className="form-control"
                  type="text"
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* <!-- Text input--> */}

          <div className="form-group">
            <label className="col-md-4 control-label" >Password</label>
            <div className="col-md-4 inputGroupContainer">
              <div className="input-group">
                <span className="input-group-addon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </span>
                <input
                  name="user_password"
                  placeholder="Password"
                  className="form-control"
                  type="password"
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* <!-- Text input--> */}

          <div className="form-group">
            <label className="col-md-4 control-label" >Confirm Password</label>
            <div className="col-md-4 inputGroupContainer">
              <div className="input-group">
                <span className="input-group-addon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </span>
                <input
                  name="confirm_password"
                  placeholder="Confirm Password"
                  className="form-control"
                  type="password"
                  onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* <!-- Text input--> */}

          <div className="form-group">
            <label className="col-md-4 control-label">Contact No.</label>
            <div className="col-md-4 inputGroupContainer">
              <div className="input-group">
                <span className="input-group-addon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                  </svg></span>
                <input
                  name="contact_no"
                  placeholder="(639)"
                  className="form-control"
                  type="text"
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label"></label>
            <div className="col-md-4"><br />

              <button type="submit" className="btn btn-primary" >Signup</button>
            </div>
          </div>

        </fieldset>
      </form>

    </div>

  );
};

export default SignUpPage;