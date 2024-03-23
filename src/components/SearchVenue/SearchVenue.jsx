import React, { useState } from 'react';
import data from "../Header/full_names.json";

export default function SearchVenue() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  
  const [value1, setValue1] = useState("");
  const [suggestions1, setSuggestions1] = useState([]);
  
  const [value2, setValue2] = useState("");
  const [suggestions2, setSuggestions2] = useState([]);
  
  const [value3, setValue3] = useState("");
  const [suggestions3, setSuggestions3] = useState([]);
  

  const onChange = (event) => {
    const { value } = event.target;
    setValue(value);
    if (value) {
      const searchTerm = value.toLowerCase();
      const filteredSuggestions = data.data.filter(item => item.full_name.toLowerCase().startsWith(searchTerm) && item.full_name.toLowerCase() !== searchTerm);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  const onChange1 = (event) => {
    const { value } = event.target;
    setValue1(value);
    if (value) {
      const searchTerm = value.toLowerCase();
      const filteredSuggestions = data.data.filter(item => item.full_name.toLowerCase().startsWith(searchTerm) && item.full_name.toLowerCase() !== searchTerm);
      setSuggestions1(filteredSuggestions);
    } else {
      setSuggestions1([]);
    }
  };

  const onChange2 = (event) => {
    const { value } = event.target;
    setValue(value);
    if (value) {
      const searchTerm = value.toLowerCase();
      const filteredSuggestions = data.data.filter(item => item.full_name.toLowerCase().startsWith(searchTerm) && item.full_name.toLowerCase() !== searchTerm);
      setSuggestions2(filteredSuggestions);
    } else {
      setSuggestions2([]);
    }
  };
  const onChange3 = (event) => {
    const { value } = event.target;
    setValue(value);
    if (value) {
      const searchTerm = value.toLowerCase();
      const filteredSuggestions = data.data.filter(item => item.full_name.toLowerCase().startsWith(searchTerm) && item.full_name.toLowerCase() !== searchTerm);
      setSuggestions3(filteredSuggestions);
    } else {
      setSuggestions3([]);
    }
  };

  const onSearch = (item) => {
    setValue(item.full_name);
    setSuggestions([]);
  };
  const onSearch1 = (item) => {
    setValue1(item.full_name);
    setSuggestions1([]);
  };
  const onSearch2 = (item) => {
    setValue2(item.full_name);
    setSuggestions2([]);
  };
  const onSearch3 = (item) => {
    setValue3(item.full_name);
    setSuggestions3([]);
  };
  return (
    <div>
    <div className='flexCenter border-gradient box-shadow search'>
        <div className='margin'>
          <form className="">
            <div className="search-container">
              <input
                type="text"
                name=""
                placeholder="No. of Guests"
                className="search-input font"
                value={value}
                onChange={onChange}
              />
              <div className="suggestions">
                {suggestions.map(item => (
                  <div key={item.id} onClick={() => onSearch(item)} className="suggestion-item">
                    {item.full_name}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className='margin'>
          <form className="">
            <div className="search-container">
              <input
                type="text"
                name=""
                placeholder="Venue Type"
                className="search-input font"
                value={value1}
                onChange={onChange1}
              />
              <div className="suggestions">
                {suggestions1.map(item => (
                  <div key={item.id} onClick={() => onSearch1(item)} className="suggestion-item2">
                    {item.full_name}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className='margin'>
          <form className="">
            <div className="search-container">
              <input
                type="text"
                name=""
                placeholder="Space Preference"
                className="search-input font"
                value={value2}
                onChange={onChange2}
              />
              <div className="suggestions">
                {suggestions2.map(item => (
                  <div key={item.id} onClick={() => onSearch2(item)} className="suggestion-item">
                    {item.full_name}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className='margin'>
          <form className="">
            <div className="search-container">
              <input
                type="text"
                name=""
                placeholder="Rating"
                className="search-input font"
                value={value3}
                onChange={onChange3}
              />
              <div className="suggestions">
                {suggestions3.map(item => (
                  <div key={item.id} onClick={() => onSearch3(item)} className="suggestion-item">
                    {item.full_name}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className="margin">
          <button className='button font' value="button">Search</button>
        </div>
      </div>


    </div>
  )
}
