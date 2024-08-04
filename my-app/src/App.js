import {useEffect, useState} from 'react'
import styles from './app.module.css'

export const App = () => {
	const  [task, setTask] = useState([])

	useEffect(()=> {
		fetch('http://localhost:3005/task')
		.then ((loadedData) => loadedData.json())
		.then((loadedTask)=> {
			setTask(loadedTask)
		})
	}, [])

  return (
    <div className={styles.app}>
		<h1 className={styles.header}>Список дел</h1>
		<ul className={styles.list}>
		{task.map(({id, name, title})=>(
		<li key={id} className={styles.listItem}>{name} : {title} </li>
		))}
		</ul>
    </div>
  );
};

export default App