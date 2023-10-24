import React from "react";

const SearchForm = () => {
  return (
    <div>
      <form id="search-form" role="search">
        <input
          id="q"
          aria-label="Search contacts"
          placeholder="Search"
          type="search"
          name="q"
          // onChange={(e) => setSearchName(e.target.value)}
        />
        <div id="search-spinner" aria-hidden hidden={true} />
        <div className="sr-only" aria-live="polite"></div>
      </form>
    </div>
  );
};

export default SearchForm;
