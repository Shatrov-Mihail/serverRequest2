import styles from "./list-case.module.css";

export const ListCase = ({ sortedCase, deleteCase, editCase }) => {
  return (
    <ul className={styles.list}>
      {sortedCase.map(({ id, name }) => (
        <li key={id} className={styles.listItem}>
          {name}
          <div className={styles.buttonList}>
            <button onClick={() => deleteCase(id)}>🗑</button>
            <button onClick={() => editCase(id)}>✐</button>
          </div>
        </li>
      ))}
    </ul>
  );
};
