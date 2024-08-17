export const useUpdateCase = ({ newCase, setListCase, setNewCase }) => {
  const updateCase = (id) => {
    fetch(`http://localhost:3005/case/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(newCase),
    })
      .then((response) => response.json())
      .then((updateCase) => {
        setListCase((prevCase) =>
          prevCase.map(
            (listCase) =>
              (listCase = listCase.id === id ? updateCase : listCase)
          )
        );
        setNewCase({ name: "", title: "" });
      });
  };
  return updateCase;
};
