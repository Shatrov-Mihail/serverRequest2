export const useAddNewCase = ({ setListCase, resetForm, newCase }) => {
  const addNewCase = () => {
    fetch("http://localhost:3005/case", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(newCase),
    })
      .then((response) => response.json())
      .then((addedCase) => {
        setListCase((prevCase) => [...prevCase, addedCase]);
        resetForm();
      })
      .catch((error) => console.error("Ошибка при добавлении дела:", error));
  };

  return addNewCase;
};
