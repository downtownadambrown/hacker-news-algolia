import React, { useState } from "react";
import store from "../store/store";

const Form = () => {
  const [searchQuery, setSearchQuery] = useState(null);

  const saveSearchResults = data => {
    store.dispatch({
      type: "add",
      payload: {
        results: data.hits,
        searchQuery,
      },
    });
  };

  const submitHandler = async e => {
    e.preventDefault();

    const baseUrl = "https://hn.algolia.com/api/v1/search?query=";
    const tags = "&tags=story";

    const res = await fetch(baseUrl + e.target.search.value + tags);
    const data = await res.json();

    saveSearchResults(data);
  };

  const changeHandler = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        name='search'
        onChange={changeHandler}
        style={{ marginRight: "1rem" }}
        placeholder='Getting hired in a pandemic'
      />
      <button>Search</button>
    </form>
  );
};

export default Form;
