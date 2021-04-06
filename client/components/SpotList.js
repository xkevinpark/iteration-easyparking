import React, { useState, useMemo, useEffect } from 'react';

const SpotList = (props) => {



  const spots = [];

  if(Array.isArray(props.spots)){
    props.spots.forEach((spot, index) => {
      const spotRow =  
        <tr key = {index}>
         <th scope="row">{index}</th>
          <td>              
            <button className="btn btn-outline-success" onClick={()=>props.onClick(spot)}>View Detail</button>
          </td>
          <td>{spot.status}</td>
          <td>{spot.locationid}</td>
          <td>{spot.id_user}</td>
          <td>{spot.expired_time}</td>
        </tr>
        spots.push(spotRow)
      });
  }



  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">View Details</th>
          <th scope="col">Status</th>
          <th scope="col">Location</th>
          <th scope="col">User ID</th>
          <th scope="col">Expiry Time</th>
        </tr>
      </thead>
      <tbody>
        {/* {
          props.spots.forEach((spot, index) => {
              <tr key = {index}>
               <th scope="row">{index}</th>
                <td>              
                  <a href="#" className="btn btn-outline-success" >View Detail</a>
                </td>
                <td>{spot.status}</td>
                <td>{spot.locationid}</td>
                <td>{spot.id_user}</td>
                <td>{spot.expired_time}</td>
              </tr>
            })
        } */}
               {spots}
      </tbody>
    </table>
  )
};


export default SpotList;



// // availableSpots
// fetch('http://localhost:3000/spot/viewAvailableSpots')
// .then(response => response.json())
// .then(availableSpots => {
//   props.availableSpots = availableSpots
// })
// .catch(err => console.log('error in available spots', err));

