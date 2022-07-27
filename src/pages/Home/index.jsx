import React, { useState, useEffect} from 'react';
import './styles.css';

import { Card } from '../../components/Card';

export function Home() {

  //add state to reflect variable value in app interface via react' reconciliation algorithm
  const [studentName, setStudentName] = useState();

  //add immutability to replace the previous state with a new state
  const [students, setStudents] = useState([]);

  const [user, setUser] = useState({ name: '', avatar: '' });

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    //gets the previous state and add a new element to the vector content to create a new state
    //uses Spread Operator (...) on vector to get content only
    setStudents(previousState => [...previousState, newStudent]);
  }
  //renders data from user's github API in Home with Hooks useEffect and Fetch API
  useEffect(() => {
    //add asynchronous requests to Hooks useEffect via function
    async function fetchData() {
      let url = 'https://api.github.com/users/fabiojdantas1';
      const res = await fetch(url);
      const data = await res.json();
      console.log('DATA ===>', data);
      setUser({
        name: data.name,
        avatar: data.avatar_url            
      });
    }

    fetchData();

  }, []);

  return (
    //add a fragment so that the function return is wrapped in a single argument expected by JSX 
    <div className="container">
      <header>
        <h1>Frequency list</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Profile picture" />
        </div>
      </header>
      <input 
        type="text" 
        placeholder="Type your name here..."
        onChange={e => setStudentName(e.target.value)}
      />
      <button 
        type="button" 
        onClick={handleAddStudent}>
          Add
      </button>
      
      {
        students.map(student => (
          <Card
            //add a unique key to each child in list 
            key={student.time}
            name={student.name} 
            time={student.time} 
          />
        ))
      }
    </div>
  );
}
