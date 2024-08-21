import styles from "./input-search.module.css";

export const InputSearch = ({
  setIsSorted,
  isSorted,
  searchCase,
  setSearchCase,
}) => {
  return (
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
  );
};
