import { useEffect, useState } from 'react'
export const isFalsy = (value: unknown) => value === 0 ? false : !!value

// 在一个函数里， 改变传入的对象本身是不好的
export const cleanObject = (obj: object) => {
	// Object.assign({}, obj)
	const result = {...obj}
	Object.keys(result).forEach(key => {
		// @ts-ignore
		const value = result[key]
		if(!isFalsy(value)) {
            // @ts-ignore
			delete result[key]
		}
	})
	return result
}

export const useMount = (callback: () => void) => {
	useEffect(() => {
		callback()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export const useDebounce = <T>(value: T, delay?: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedValue(value), delay)
		return () => clearTimeout(timeout)
	}, [value, delay])

	return debouncedValue
}
