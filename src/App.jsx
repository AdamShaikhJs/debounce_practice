import React, { useState } from 'react';

const SearchBar = () => {
  const [numberOfKeyPresses, setNumberOfKeyPresses] = useState(0);
  const [numberOfApiCalls, setNumberOfApiCalls] = useState(0);
  const [numberOfApi, setNumberOfApi] = useState(0);

  const getSearchResultDebounced = debounce(() => {
    setNumberOfApiCalls((prevCount) => prevCount + 1);
  }, 1000);

  const getSearchResultThrottled = throttle(() => {
    setNumberOfApi((prevCount) => prevCount + 1);
  }, 1000);

  function debounce(callback, delay = 1000) {
    let time;
    return (...args) => {
      clearTimeout(time);
      time = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }
  function throttle(callback, delay = 1000) {
    let lastCall = 0;
    return (...args) => {
      const now = new Date().getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      callback(...args);
    };
  }

  const handleChange = (e) => {
    setNumberOfKeyPresses((prevCount) => prevCount + 1);
    getSearchResultDebounced();
    getSearchResultThrottled();
  };

  return (
    <div style={{ marginRight: '20px' }}>
      <input
        type="text"
        id="search-bar"
        onChange={handleChange}
        placeholder="Search"
      />
      <h4> Number of KeyPresses : {numberOfKeyPresses}</h4>
      <h4> Number of api call : {numberOfApiCalls}</h4>
      <h4> Number of api call throttle: {numberOfApiCalls}</h4>
    </div>
  );
};

export default SearchBar;
