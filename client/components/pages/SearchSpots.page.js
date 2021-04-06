import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../contexts/Auth.context";

import SpotList from '../SpotList';
import Menu from '../layout/Menu.layout'

const SearchSpotsPage = (props) => {
	const abortController = new AbortController();
  const { user, setUser} = useContext(AuthContext);
	const [spots, setSpots] = useState([]);
	const [query, setQuery] = useState('');
  const history = useHistory();

  useEffect(() => {

    if (!user) history.push('/');
    fetch(`/spot/viewAvailableSpots`)
    .then(response => response.json())
    .then(spots => {
      setSpots(spots);
    });

		return function cleanup() {
			abortController.abort();
		};
	}, []);

  useEffect(() => {
    console.log("USER!!!", user);
    if (!user) history.push('/');

	});

  const handleClick = (spot) => {
    // e.preventDefault();
    history.push({
      pathname:`/spot-detail`,
      state: { spot: spot } //Passes the spot inside location.state.item
    })
  };

  const searchHandler = () => {

    fetch('/spot/viewAllSpots')
      .then(response => response.json())
      .then(spots => {
        setSpots(spots);
      });
  };

  const searchavailableHandler = () => {
    fetch(`/spot/viewAvailableSpots`)
    .then(response => response.json())
    .then(spots => {
      setSpots(spots);
    });
  };
  // Spot List. Only mount if spots data has been received
  // const spots;
  // if(spots.length>0) const spotList = <SpotList spots={spots} onClick={handleClick}></SpotList> 


	return (
		<div>	
 		<Menu/> 
      { user ? (
      <div>      
        <div className="container">
          <div className="dashboard-bar dashboard">Spot Search</div>
          <div className="row search-item">
            <div className="col-3">
            </div>
              <a className="btn btn-primary" href="#" role="button" onClick={searchHandler}>View All</a> 
              <a className="btn btn-primary" href="#" role="button" onClick={searchavailableHandler}>View Available</a> 
            <div className="col-3">
            </div>
            <div className="col-2">
            </div>

            <div className="col-4">
            </div>
          </div>
          <div className="dashboard-main dashboard">
          <SpotList spots={spots} onClick={handleClick}></SpotList>
            

          
          </div>
        </div>
      </div>
      ) :
      (<div>loading...</div>)
      }
      
		</div>
	);
};

export default SearchSpotsPage;