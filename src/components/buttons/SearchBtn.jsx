import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SearchBtn = () => {
    const [search, setSearch] = useState('');

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSearchClick = () => {
        if (!search) {
            return; // Do nothing if search is empty
        }
        // Navigate to search page or perform search functionality here
        setSearch(''); // Clear the search text box when clicked
    };

    return (
        <>
            <input
                className="mr-sm-2 mx-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={handleSearchChange}
            />
            {search && (
                <NavLink
                    to={`/products/search/${search}`}
                    className="btn btn-outline-primary ms-2 mx-2"
                    onClick={handleSearchClick}
                >
                    <span className="fa fa-search me-1"></span>
                </NavLink>
            )}
        </>
    );
};

export default SearchBtn;