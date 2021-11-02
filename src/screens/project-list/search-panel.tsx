import { Input, Select } from 'antd'

export interface User {
    id: string;
    name: string;
    email: string;
    title: string;
    organization: string
    token: string
}

interface SearchPanel {
    users: User[];
    param: {
        name: string,
        personId: string
    };
    setParam: (param: SearchPanel['param']) => void
}

export const SearchPanels = ({ users, param, setParam }: SearchPanel) => {
    return (
        <form>
            <div>
                <Input type="text" value={param.name} onChange={event => setParam({
                    ...param,
                    name: event?.target.value
                })} />
                <Select value={param.personId} onChange={value => setParam({
                    ...param,
                    personId: value
                })}>
                    <Select.Option value={''}>负责人</Select.Option>
                    {
                        users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)
                    }
                </Select>
            </div>
        </form>
    )
}
