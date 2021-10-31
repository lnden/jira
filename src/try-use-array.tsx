import React, { useState } from 'react'
import { useMount } from './utils'
interface P {
    name: string;
    age: number;
}
const useArray = (v: P[]) => {
    const [value, setVal] = useState(v)
    const add = (item: P) => {
        setVal([...value, item])
    }
    const removeIndex = (index: number) => {
        let copyArr = [...value];
        copyArr.splice(index, 1)
        setVal(copyArr)
    }
    const clear = () => {
       setVal([])
    }

    return { add, removeIndex, clear, value }
}
export const TsReactTest = () => {
    const persons: P[] = [
        {
            name: '1111', age: 11,

        },
        {
            name: '2222',  age: 22
        }
    ];

    const { add, removeIndex, clear, value } = useArray(persons)

    useMount(() => {
        // console.log(value.notExist)

        // add({name: 'david', age:25})
        // removeIndex('123')
    })
    return (
        <div>
            <button onClick={() => add({name: 'john', age: 26})}>add john</button>
            <button onClick={() => removeIndex(0)}>remove 0</button>
            <button onClick={() => clear()}>clear</button>
            {
                value.map((person: {name: string, age: number}, index: number) => (
                    <div style={{marginBottom: '30px'}} key={index}>
                        <span style={{color: 'red'}}>{index}</span>
                        <span>{person.name}</span>
                        <span>{person.age}</span>
                    </div>
                ))
            }
        </div>
    )
}
