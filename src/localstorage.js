import {useState, useEffect} from 'react';

// 2. provide a key
function getLocalStorageValue(key) {
	// retrieve the value and assign it to `val`
  const val = localStorage.getItem(key);
  // error handling
  if (!val) return null;

  try {
  	// RETURNED: parse the value back into JSON
    return JSON.parse(val);
  } catch (e) {
  	// error handling 2
    return null;
  }
}

// 1. provide a key, and a value to store
function setLocalStorage(key, value) {
	// stringify the value and set it
  localStorage.setItem(key, JSON.stringify(value));
}


export function usePersistentState(key, defaultState = '') {

	// new useState tuple, set initial value as the returned JSON from local storage
  const [state, setState] = useState(getLocalStorageValue(key) || defaultState);

  // Each time the state changes, re-save it into local storage
  useEffect(() => {
    setLocalStorage(key, state);
  });

  return [state, setState];
}
