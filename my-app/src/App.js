import { useState, useEffect } from "react";
import styles from "./app.module.css";
import { ListCase } from "./components/ul-list/list-case";
import { FormCase } from "./components/form/form-case";
import {
  useAddNewCase,
  useDeleteCase,
  useUpdateCase,
} from "./components/hooks";
import { InputSearch } from "./components/input-search/input-search";

export const App = () => {
  const [listCase, setListCase] = useState([]);
  const [newCase, setNewCase] = useState({ name: "" });
  const [isSorted, setIsSorted] = useState(false);
  const [searchCase, setSearchCase] = useState("");

  const resetForm = () => {
    setNewCase({ id: null, name: "" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/case');
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        setListCase(data);
      } catch (error) {
        console.error('Ошибка при загрузке дел:', error);
      }
    };

    fetchData();
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
    setNewCase,
  });

  const editCase = (id) => {
    const caseToEdit = listCase.find((caseItem) => caseItem.id === id);
    if (caseToEdit) {
      setNewCase(caseToEdit);
    }
  };

  const filteredCase = listCase.filter(
    (listCase) =>
      listCase &&
      listCase.name &&
      listCase.name.toLowerCase().includes(searchCase.toLocaleLowerCase())
  );

  const sortedCase = isSorted
    ? [...filteredCase].sort((a, b) => a.name.localeCompare(b.name))
    : filteredCase;

  return (
    <div className={styles.app}>
      <InputSearch
        isSorted={isSorted}
        searchCase={searchCase}
        setIsSorted={setIsSorted}
        setSearchCase={setSearchCase}
      />

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
