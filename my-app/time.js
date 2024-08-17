import { useState } from "react";

export const useUpdateCase = (setListCase) => {
  const [newCase, setNewCase] = useState({ name: "", title: "" });

  const updateCase = (id) => {
    fetch(`http://localhost:3005/case/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(newCase),
    })
      .then((response) => response.json())
      .then((updateCase) => {
        setListCase((prevCase) =>
          prevCase.map((listCase) =>
            listCase.id === id ? updateCase : listCase
          )
        );
        setNewCase({ name: "", title: "" });
      });
  };

  const addNewCase = () => {
    fetch(`http://localhost:3005/case`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(newCase),
    })
      .then((response) => response.json())
      .then((addedCase) => {
        setListCase((prevCase) => [...prevCase, addedCase]);
        setNewCase({ name: "", title: "" });
      });
  };

  return {
    updateCase,
    newCase,
    addNewCase,
    setNewCase,
  };
};
