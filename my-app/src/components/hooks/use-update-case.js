export const useUpdateCase = ({ newCase, setListCase, resetForm }) => {
  const updateCase = (id) => {
    fetch(`http://localhost:3005/case/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(newCase),
    })
      .then((response) => response.json())
      .then((updatedCase) => {
        setListCase((prevCase) =>
          prevCase.map((caseItem) =>
            caseItem.id === id ? updatedCase : caseItem
          )
        );
        resetForm();
      })
      .catch((error) => console.error("Ошибка при обновлении дела:", error));
  };
  return updateCase;
};
