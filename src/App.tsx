import React, { useState, useEffect } from 'react';
import { User, Query, requestUsers, requestUsersWithError } from './api';
import "./styles.css";


const App: React.FC = () => {

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [nameFilter, setNameFilter] = useState('')
  const [ageFilter, setAgeFilter] = useState('')
  const [limit, setLimit] = useState(4)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError(null)

    requestUsers({name: nameFilter, age: ageFilter, limit, offset})
    .then((data) => {
      setLoading(false)
      setUsers(data)
    })
    .catch((err) => {
      setLoading(false)
      setError(err.message)
    })
  },[nameFilter, ageFilter, limit, offset])

  return(
    <div className='container'>
      {loading && <p className='loading'>Loading...</p>}
      {error && <p className='error'>{error}</p>}
      {users.length === 0 && !loading && error === null && <p className='not-found'>Users not found</p>}
      <div className='user-list'>
      {users.map((user) => (
        <p key={user.id.toString()}>
      {`${user.name}, ${user.age}`}
        </p>
      ))}
      </div>
      
      <input
       className="filter-input"
        placeholder="Filter by name"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <input
       className="filter-input"
        placeholder="Filter by age"
        value={ageFilter}
        onChange={(e) => setAgeFilter(e.target.value)}
      />
      <button className="button" onClick={() => setOffset(offset + limit)}>Next page</button>
      <button className="button" onClick={() => setOffset(Math.max(0, offset - limit))}>Previous page</button>
    </div>
  )
}

export default App;
