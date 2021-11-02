import { useState, useEffect } from 'react'
import { SearchPanels } from './search-panel'
import { List } from './list'
import { cleanObject, useDebounce, useMount } from "../../utils/index";
import { useHttp } from "../../utils/http";

// const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
	const [param, setParam] = useState({
		name: '',
		personId: ''
	})
	const debouncedParam = useDebounce(param, 200)

	const [users, setUsers] = useState([])
	const [list, setList] = useState([])

	const client = useHttp()

	useEffect(() => {
		client('projects', { data: cleanObject(debouncedParam) }).then(setList)

		// fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async res => {
		// 	if (res.ok) {
		// 		setList(await res.json())
		// 	}
		// })
	}, [debouncedParam])

	useMount(() => {
		client('users').then(setUsers)
		// client('users').then(setUsers)

		// fetch(`${apiUrl}/users`).then(async res => {
		// 	if (res.ok) {
		// 		setUsers(await res.json())
		// 	}
		// })
	})

	return (
		<div>
			<SearchPanels users={users} param={param} setParam={setParam} />
			<List users={users} list={list} />
		</div>
	)
}
