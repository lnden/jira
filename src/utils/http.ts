import qs from 'qs';
import * as auth from '../auth-provider'
import { useAuth } from '../context/auth-context'

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  token?: string;
  data?: object
}
export const http = async(endpoint: string, {data, token, headers, ...customeConfig}: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}`: '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customeConfig
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async response => {
      if (response.status === 401) {
        await auth.logout()
        window.location.reload()
        return Promise.reject({message: '请重新登录'})
      }
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

// JS 中的 typeof， 是在runtime时运行的
// return typeif 1 === 'number'

// TS 中的 typeof, 是在静态环境运行的
// return (...[endpoint,  config]: Parameters<typeof http>) =>
// TS typeof 是把 http 的类型提取(函数类型)  Parameters 可以读出函数类型的参数型
export const useHttp = () => {
  const { user } = useAuth()
  // TODO 讲解 TS Utility Types   <typeof ts 静态>
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
  // return (...[endpoint, config]: [string, Config]) => http(endpoint, {...config, token: user?.token})
}

// 联合类型
let myFavoriteNumbe: string | number
let jackFavoriteNumber: string | number

// 可以使用类型别名来 优化 联合类型
type FavoriteNumber = string | number

let roseFavoriteNumber: FavoriteNumber = 6

// interface 和 type 类似， 类型别名可以在很多情况下和interface互换
// interface Person {
//   name: string
// }

type Person = { name: string }

const xiaoMing: Person = { name: 'xiaoming' }

/**
 * 两个细微的区别
 */
// 1. 类型别名， interface 在这种情况下没发替代 type
type FavoriteNumber1 = string | number
let roseFavoriteNumber1: FavoriteNumber1 = 6

// 2. interface 也没法实现 Utility Type
type Person1 = {
  name: string,
  age: number
}

const xiaoMing1: Partial<Person1> = { name: 'xiaoMing' }
// const shenMiRen: Omit<Person1,  'name'> = { name: 'shenMiRen' }
// const shenMiRen: Omit<Person1,  'name'> = { age: 26 }
const shenMiRen: Omit<Person1,  'name' | 'age'> = {}
type PersonKeys = keyof Person1
type PersonOnlyName = Pick<Person1, 'name' | 'age'>
type Age = Exclude<PersonKeys, 'name'>

