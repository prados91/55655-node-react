import React from 'react';
import { FaSearch } from 'react-icons/fa';

import './Filter.css';

const Filter = ({ setTitle }) => {

    const searchTitle = (event) => {
        event.preventDefault();
        const inputValue = document.getElementById('text').value;
        setTitle(inputValue)
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchTitle(event);
        }
    };


    return (
        <div className="search-container">
            <input
                id="text"
                type="text"
                placeholder="Look for a product..."
                className="search-input"
                onKeyDown={handleKeyPress}
            />
            <FaSearch id="search" onClick={searchTitle} className="search-btn" />
        </div>
    );
};

export default Filter;
