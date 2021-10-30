import React, {useState, useEffect} from 'react'
import qs from 'qs'
import { SearchPanel } from './search-panel'
import { List } from './list'
import {cleanObject, useDebounce, useMount} from "../../utils";


const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
	const [param, setParam] = useState({
		name: '',
		personId: ''
	})
	const debouncedParam = useDebounce(param, 2000)
	
	const [users, setUsers] = useState([])
	const [list, setList] = useState([])
	
	useEffect(() => {
		fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async res => {
			if (res.ok) {
				setList(await res.json())
			}
		})
	}, [debouncedParam])
	
	useMount(() => {
		fetch(`${apiUrl}/users`).then(async res => {
			if(res.ok) {
				setUsers(await res.json())
			}
		})
	})
	
	return <div>
		<SearchPanel users={users} param={param} setParam={setParam} />
		<List users={users} list={list}/>
	</div>
}
