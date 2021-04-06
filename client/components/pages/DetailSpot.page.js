import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from "../contexts/Auth.context";

import Menu from '../layout/Menu.layout'

const DetailSpot = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const [checkIn, setCheckIn] = useState();
  const [spot, setSpot] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!user) history.push('/');
    if (location.state.spot) {
      setSpot(location.state.spot);
      if (location.state.spot.status === 'open') {
        setCheckIn(true);
      } else {
        setCheckIn(false);
      }
    }

  }, []);

  useEffect(() => {
    console.log("User: ", user);
    if (!user) history.push('/');
  }, []);

  const checkinHandler = (e) => {
    e.preventDefault();
    fetch(`/spot/checkin/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spotId: spot.id, userId: user[0].id, time:1 }),
    })
      .then(response => response.json())
      .then(data => {
        setSpot(data);
        history.push('/search-spots');
      })
  }

  const checkoutHandler = (e) => {
    e.preventDefault();
    fetch(`/spot/checkout/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spotId: spot.id }),
    })
      .then(response => response.json())
      .then(data => {
        setSpot(data);
        history.push('/search-spots');
      })
  }
  return (
    <div>

      <Menu />
      { spot ? (
        <div>
          <div className="container">
            <div className="dashboard-bar dashboard">Spot Detail</div>

            <div className="dashboard-main dashboard">
              <div className="card">
                <div className="card-body">
                  {/* <h5 className="card-title">ID: {spot.id}</h5> */}
                  <p className="card-text">Time: 1hr</p>
                  {checkIn ? (
                    <button href="#" className="btn btn-primary" onClick={checkinHandler}>Check In</button>
                  ) : (
                    <button href="#" className="btn btn-primary" onClick={checkoutHandler}>Check Out</button>
                  )}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      ) :
        (<div>loading...</div>)
      }

    </div>
  );
};

export default DetailSpot;
