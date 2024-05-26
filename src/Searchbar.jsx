import React, { useState, useEffect } from 'react';

import { FaSearch } from "react-icons/fa";

const placeholders = ["'products'", "'electronics'", "'fashion'"];

const Search = () => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000); // Change placeholder every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <>
    <input
      type="text"
      placeholder={`search: ${placeholders[placeholderIndex]}`}
      className='h-10 border w-96 rounded-l-md ml-10  p-2 text-lg'>
      
    </input>
    
    <div className='h-10  p-2 bg-blue-700 w-16 text-white border-none rounded-r-md'><FaSearch className='h-8 w-6 pl-2 ' /></div>
    </>
  );
};

export default Search;