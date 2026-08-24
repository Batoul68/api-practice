import React, { useEffect, useState, useRef } from 'react';
import './App.css'
import { getList, setItem } from '../../services/list';

function App() {

  const [alert, setAlert] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [itemInput, setItemInput] = useState('');
  const [list, setList] = useState([]);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (list.length && !alert) {
      return;
    }
    getList()
      .then(items => {
        if(mounted.current) {
          setList(items);
        }
      });
    return () => {
      mounted.current = false;
    }
  }, [alert, list]);

  useEffect(() => {
    if(alert) {
      setTimeout(() => {
        if (mounted.current) {
          setAlert(false);
        }
      }, 1000);
    }
  }, [alert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setItem(itemInput)
      .then(() => {
        if (mounted.current) {
          setSubmitting(false);
          setItemInput('');
          setAlert(true);
        }
      });
  }

  return(
    <div className="wrapper">
      <h1>My Grocery List</h1>
      <ul>
        {list.map(item => <li key={item.id}>{item.item}</li>)}
      </ul>
      {alert && <h2>Submit Successful</h2>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>New Item</p>
          <input 
            type="text" 
            onChange={event => setItemInput(event.target.value)} 
            value={itemInput}
            disabled={submitting}
          />
        </label>
        <button type="submit" disabled={submitting}>Submit</button>
      </form>
    </div>
  );
}

export default App
