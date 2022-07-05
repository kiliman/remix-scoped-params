import faker from '@faker-js/faker'
import { getRandom, range } from '~/utils'

declare global {
  var people: Record<string, Person[]>
}

export type Person = {
  name: string
  title: string
  email: string
  role: string
}

export const roles = ['Admin', 'Editor', 'Viewer', 'Guest', 'Member']
const PEOPLE_COUNT = 50

export function getPeople({
  scope,
  search,
  role,
  page,
  pageSize,
  sort,
  order,
}: {
  scope: string
  search: string
  role: string
  page: number
  pageSize: number
  sort: string
  order: string
}) {
  if (!global.people) global.people = {}
  // initialize data
  if (!global.people[scope]) {
    global.people[scope] = range(1, PEOPLE_COUNT).map(() => {
      const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()
      return {
        name: `${firstName} ${lastName}`,
        title: faker.name.jobTitle(),
        email: faker.internet.email(firstName, lastName),
        role: roles[getRandom(0, roles.length - 1)],
      }
    })
  }
  // filter data
  const results = global.people[scope].filter(
    person =>
      person.name.toLowerCase().includes(search.toLowerCase()) &&
      (role === '' || person.role === role),
  )
  // sort data
  const sortKey = sort as keyof Person
  const sorted = results.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return order === 'asc' ? -1 : 1
    if (a[sortKey] > b[sortKey]) return order === 'asc' ? 1 : -1
    return 0
  })
  // paginate data
  const pageCount = Math.ceil(sorted.length / pageSize)
  if (page > pageCount) {
    page = Math.max(1, Math.floor(sorted.length / pageSize))
  }
  return {
    people: sorted.slice((page - 1) * pageSize, page * pageSize),
    pageCount,
    totalResults: sorted.length,
  }
}
