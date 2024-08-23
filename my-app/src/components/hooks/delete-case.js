export const useDeleteCase = ({ setListCase }) => {
  const deleteCase = (id) => {
    fetch(`http://localhost:3005/case/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setListCase((prevCase) =>
          prevCase.filter((caseItem) => caseItem.id !== id)
        );
      })
      .catch((error) => console.error("Ошибка при удалении дела:", error));
  };
  return deleteCase;
};
