import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm";
const Profile = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {}, [value]);
  const update = () => {
    setValue(value + 1);
    setValue(value + 1);
  };
  return (
    <div>
      <SearchForm></SearchForm>
      <h2> Profile </h2>
      <div onClick={() => update()}>{value}</div>
    </div>
  );
};

export default Profile;
