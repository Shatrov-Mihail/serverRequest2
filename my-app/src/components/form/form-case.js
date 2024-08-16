
export const FormCase = ({handleSubmit, newCase, setNewCase}) => {
	return (
		<form onSubmit={handleSubmit}>
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
        <button type="submit">{newCase.id ? "Изменить" : "Добавить"}</button>
      </form>
	)
}