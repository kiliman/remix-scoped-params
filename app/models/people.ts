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

const roles = ['Admin', 'Editor', 'Viewer', 'Guest', 'Member']
const PAGE_SIZE = 10

export function getPeople(
  scope: string,
  count: number,
  page: number,
  sort: string,
  order: string,
) {
  if (!global.people) global.people = {}
  if (!global.people[scope]) {
    global.people[scope] = range(1, count).map(() => {
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
  const sortKey = sort as keyof Person
  const sorted = global.people[scope].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return order === 'asc' ? -1 : 1
    if (a[sortKey] > b[sortKey]) return order === 'asc' ? 1 : -1
    return 0
  })
  return {
    people: sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    pageCount: Math.ceil(sorted.length / PAGE_SIZE),
    totalResults: sorted.length,
  }
}
