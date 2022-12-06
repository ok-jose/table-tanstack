import { faker } from '@faker-js/faker'
faker.setLocale('zh_CN')

export type Car = {
  brand: string
  price: number
  model: string
  year: number
  seats: number
  owner: string
  plate: string
  color: string
  fuel: string
  subRows?: Car[]
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newCar = (): Car => {
  return {
    brand: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    price: faker.datatype.number(100000000),
    fuel: faker.vehicle.fuel(),
    year: faker.datatype.number(2000),
    seats: faker.datatype.number(6),
    owner: faker.name.firstName(),
    color: faker.vehicle.color(),
    plate: faker.vehicle.vrm(),
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Car[] => {
    const len = lens[depth]!
    return range(len).map((): Car => {
      return {
        ...newCar(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}

const data = makeData(1000)
const treeData = makeData(1000, 5, 3)

export async function fetchCarData(options: {
  pageIndex: number
  pageSize: number
  tree?: boolean
}) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500))
  const resultData = options.tree ? treeData : data

  return {
    data: resultData.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize,
    ),
    total: resultData.length,
  }
}
