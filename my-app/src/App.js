import { useState, useEffect } from "react";
import styles from "./app.module.css";

export const App = () => {
  const [isCase, setIsCase] = useState([]);
  const [newCase, setNewCase] = useState({ name: "", title: "" });
  const [isSorted, setIsSorted] = useState(false);
  const [searchCase, setSearchCase] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3005/case`)
      .then((response) => response.json())
      .then((data) => setIsCase(data));
  }, []);

  const addNewCase = () => {
    fetch(`http://localhost:3005/case`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(newCase),
    })
      .then((response) => response.json())
      .then((addedCase) => {
        setIsCase((prevCase) => [...prevCase, addedCase]);
        setNewCase({ name: "", title: "" });
      });
  };

  const deleteCase = (id) => {
    fetch(`http://localhost:3005/case/${id}`, {
      method: "DELETE",
    }).then(() => {
      setIsCase((prevCase) => prevCase.filter((isCase) => isCase.id !== id));
    });
  };

  const updateCase = (id) => {
    fetch(`http://localhost:3005/case/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(newCase),
    })
      .then((response) => response.json())
      .then((updateCase) => {
        setIsCase((prevCase) =>
          prevCase.map(
            (isCase) => (isCase = isCase.id === id ? updateCase : isCase)
          )
        );
        setNewCase({ name: "", title: "" });
      });
  };

  const filteredCase = isCase.filter(
    (isCase) =>
      isCase.name.toLowerCase().includes(searchCase.toLocaleLowerCase()) ||
      isCase.title.toLowerCase().includes(searchCase.toLocaleLowerCase())
  );

  const sortedCase = isSorted
    ? [...filteredCase].sort((a, b) => a.name.localeCompare(b.name))
    : filteredCase;

  return (
    <div className={styles.app}>
	<div className={styles.headerSearch}>
      <button
        onClick={() => setIsSorted(!isSorted)}
      >
        {isSorted ? "Сбросить сортировку" : "Сортировать по алфавиту"}
      </button>

      <input
        type="text"
        placeholder="Поиск..."
        value={searchCase}
        onChange={(e) => setSearchCase(e.target.value)}
      />
	</div>

      <div>
        <input
          type="text"
          placeholder="Название нового дела"
          value={newCase.name}
          onChange={(e) => setNewCase({ ...newCase, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Описание нового дела"
          value={newCase.title}
          onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
        />
        <button onClick={addNewCase}>Добавить</button>
      </div>

      <h1 className={styles.header}>Список дел</h1>

      <ul className={styles.list}>
        {sortedCase.map(({ id, name, title }) => (
          <li key={id} className={styles.listItem}>
            {name}.  {title}
			<div className={styles.buttonList}>
            <button onClick={() => deleteCase(id)}>Удалить</button>
            <button onClick={() => updateCase(id)}>Изменить</button>
			</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
