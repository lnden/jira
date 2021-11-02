import { User } from './search-panel'
import { Table } from 'antd'

interface Project {
	id: string;
	name: string;
	personId: string;
	pin: boolean;
	organization: string;
}
interface ListProps {
	list: Project[];
	users: User[]
}
export const List = ({ list, users }: ListProps) => {
	return (
		<Table
			pagination={false}
			columns={[
				{
					title: '名称',
					dataIndex: 'name',
					sorter: (a, b) => a.name.localeCompare(b.name),
					key: '1'
				},
				{
					title: '负责人',
					render(value, project) {
						return (
							<span>{users.find((user: User) => user.id === project.personId)?.name || '未知'}</span>
						)
					},
					key: '2'
				},
			]}
			dataSource={list}></Table>
	)
}
