import { useState, useEffect } from "react";
import styles from "./app.module.css";
import { ListCase } from "./components/ul-list/list-case";
import { FormCase } from "./components/form/form-case";

export const App = () => {
  const [isCase, setIsCase] = useState([]);
  const [newCase, setNewCase] = useState({ name: "", title: "" });
  const [isSorted, setIsSorted] = useState(false);
  const [searchCase, setSearchCase] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3005/case`)
      .then((response) => response.json())
      .then((data) => setIsCase(data))
      .catch((error) => console.error("Ошибка при загрузке дел:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCase.id) {
      updateCase(newCase.id);
    } else {
      addNewCase();
    }
  };

  const addNewCase = () => {
    fetch("http://localhost:3005/case", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(newCase),
    })
      .then((response) => response.json())
      .then((addedCase) => {
        setIsCase((prevCase) => [...prevCase, addedCase]);
        resetForm();
      })
      .catch((error) => console.error("Ошибка при добавлении дела:", error));
  };

  const deleteCase = (id) => {
    fetch(`http://localhost:3005/case/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setIsCase((prevCase) => prevCase.filter((caseItem) => caseItem.id !== id));
      })
      .catch((error) => console.error("Ошибка при удалении дела:", error));
  };

  const updateCase = (id) => {
    fetch(`http://localhost:3005/case/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(newCase),
    })
      .then((response) => response.json())
      .then((updatedCase) => {
        setIsCase((prevCase) =>
          prevCase.map((caseItem) => (caseItem.id === id ? updatedCase : caseItem))
        );
        resetForm();
      })
      .catch((error) => console.error("Ошибка при обновлении дела:", error));
  };

  const editCase = (id) => {
    const caseToEdit = isCase.find((caseItem) => caseItem.id === id);
    if (caseToEdit) {
      setNewCase(caseToEdit);
    }
  };

  const resetForm = () => {
    setNewCase({ id: null, name: "", title: "" });
  };

  const filteredCase = isCase.filter(
    (isCase) =>
      (isCase &&
        isCase.name &&
        isCase.name.toLowerCase().includes(searchCase.toLocaleLowerCase())) ||
      (isCase &&
        isCase.name &&
        isCase.title.toLowerCase().includes(searchCase.toLocaleLowerCase()))
  );

  const sortedCase = isSorted
    ? [...filteredCase].sort((a, b) => a.name.localeCompare(b.name))
    : filteredCase;

  return (
    <div className={styles.app}>
      <div className={styles.headerSearch}>
        <button onClick={() => setIsSorted(!isSorted)}>
          {isSorted ? "Сбросить сортировку" : "Сортировать по алфавиту"}
        </button>

        <input
          type="text"
          placeholder="Поиск..."
          value={searchCase}
          onChange={(e) => setSearchCase(e.target.value)}
        />
      </div>

      <FormCase handleSubmit={handleSubmit} newCase={newCase} setNewCase={setNewCase} />

      <h1 className={styles.header}>Список дел</h1>
      <ListCase sortedCase={sortedCase} deleteCase={deleteCase} editCase={editCase} />
    </div>
  );
};

export default App;
