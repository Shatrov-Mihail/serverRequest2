export const FormCase = ({ handleSubmit, newCase, setNewCase }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введите задачу..."
        value={newCase.name}
        onChange={(e) => setNewCase({ ...newCase, name: e.target.value })}
      />

      <button type="submit">{newCase.id ? "Изменить" : "Добавить"}</button>
    </form>
  );
};
