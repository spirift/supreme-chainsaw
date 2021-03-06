import React, { useEffect, useState } from 'react';

const List = () => {
  const [drones, setDrones] = useState([])
  const [minNumCrashes] = useState(0)
  const [maxNumCrashes] = useState(100)
  useEffect(() => {
    const caller = async () => {
      let data = await fetch('https://bobs-epic-drone-shack-inc.herokuapp.com/api/v0/drones')
      if (data.ok) {
        data = await data.json()
        setDrones(data)
      } else {
        caller()
      }
    }
    caller()
  }, [])
  return (
    <div>
      <h1>Drones</h1>
      <ul>
        {drones && drones.filter(({numCrashes}) => numCrashes > minNumCrashes && numCrashes < maxNumCrashes).map(({droneId, name, price, currency, numFlights, numCrashes} = {}) => (<li>
          <h3>{name}</h3>
          <span>{price} {currency}</span>
          <span>Flights: {numFlights}</span>
          <span>Crashes: {numCrashes}</span>
        </li>))}
      </ul>
    </div>
  )
}

export default List