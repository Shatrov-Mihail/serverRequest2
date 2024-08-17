import { useState, useEffect } from "react";
import styles from "./app.module.css";
import { ListCase } from "./components/ul-list/list-case";
import { FormCase } from "./components/form/form-case";
import {
  useAddNewCase,
  useDeleteCase,
  useUpdateCase,
} from "./components/hooks";

export const App = () => {
  const [listCase, setListCase] = useState([]);
  const [newCase, setNewCase] = useState({ name: "", title: "" });
  const [isSorted, setIsSorted] = useState(false);
  const [searchCase, setSearchCase] = useState("");

  const resetForm = () => {
    setNewCase({ id: null, name: "", title: "" });
  };

  useEffect(() => {
    fetch(`http://localhost:3005/case`)
      .then((response) => response.json())
      .then((data) => setListCase(data))
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

  const addNewCase = useAddNewCase({
    setListCase,
    resetForm,
    newCase,
  });

  const deleteCase = useDeleteCase({ setListCase });

  const updateCase = useUpdateCase({
    newCase,
    setListCase,
    resetForm,
	setNewCase
  });

  const editCase = (id) => {
    const caseToEdit = listCase.find((caseItem) => caseItem.id === id);
    if (caseToEdit) {
      setNewCase(caseToEdit);
    }
  };

  const filteredCase = listCase.filter(
    (listCase) =>
      (listCase &&
        listCase.name &&
        listCase.name.toLowerCase().includes(searchCase.toLocaleLowerCase())) ||
      (listCase &&
        listCase.name &&
        listCase.title.toLowerCase().includes(searchCase.toLocaleLowerCase()))
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

      <FormCase
        handleSubmit={handleSubmit}
        newCase={newCase}
        setNewCase={setNewCase}
      />

      <h1 className={styles.header}>Список дел</h1>
      <ListCase
        sortedCase={sortedCase}
        deleteCase={deleteCase}
        editCase={editCase}
      />
    </div>
  );
};

export default App;
