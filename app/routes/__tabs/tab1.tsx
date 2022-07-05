import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Form,
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from '@remix-run/react'
import Pagination from '~/components/Pagination'
import SortColumn from '~/components/SortColumn'
import type { Person } from '~/models/people'
import { getPeople, roles } from '~/models/people'
import { getScopedParams, useScopedParams } from '~/utils/scopedParams'

const PAGE_SIZE = 10

type LoaderType = {
  scope: string
  people: Person[]
  search: string
  role: string
  pageCount: number
  page: number
  totalResults: number
  start: number
  end: number
}

export const loader: LoaderFunction = async ({ request }) => {
  const scope = new URL(request.url).pathname.substring(1)
  const scopedParams = getScopedParams(request, scope)
  const search = scopedParams.get('search') ?? ''
  const role = scopedParams.get('role') ?? ''
  let page = Number(scopedParams.get('page')) || 1
  const sort = scopedParams.get('sort') || 'name'
  const order = scopedParams.get('order') || 'asc'
  const { people, pageCount, totalResults } = getPeople({
    scope,
    search,
    role,
    page,
    pageSize: PAGE_SIZE,
    sort,
    order,
  })

  // make sure the page is in range
  if (page > pageCount) {
    page = Math.max(1, Math.floor(totalResults / PAGE_SIZE))
  }

  const start = totalResults === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const end = Math.min(page * PAGE_SIZE, totalResults)

  return json({
    scope,
    people,
    search,
    role,
    pageCount,
    page,
    totalResults,
    start,
    end,
  })
}

export default function () {
  const {
    scope,
    people,
    search,
    role,
    pageCount,
    page,
    totalResults,
    start,
    end,
  } = useLoaderData<LoaderType>()
  const navigate = useNavigate()
  const location = useLocation()
  const { getScopedSearch } = useScopedParams(scope)

  const handleSearch = (search: string) => {
    navigate(getScopedSearch({ search, page: 1 }), { replace: true })
  }
  const handleRole = (role: string) => {
    navigate(getScopedSearch({ role, page: 1 }), { replace: true })
  }

  return (
    <div>
      <div className="mt-8 flex flex-col">
        <Form method="get" action={`${location.pathname}${location.search}`}>
          <div className="flex items-baseline gap-4">
            <div>Filter names:</div>
            <input
              name="query"
              placeholder="Search..."
              type="text"
              autoFocus
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className="border-2 rounded w-96 px-2 py-1 mb-4"
            />
            <div>Select role:</div>
            <select
              name="role"
              value={role}
              className="border-2 rounded w-96 px-2 py-2 mb-4"
              onChange={e => handleRole(e.target.value)}
            >
              <option value="">All</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </Form>
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <SortColumn scope={scope} name="name" label="Name" />
                    <SortColumn scope={scope} name="title" label="Title" />
                    <SortColumn scope={scope} name="email" label="Email" />
                    <SortColumn scope={scope} name="role" label="Role" />
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {people.map(person => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.role}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          to="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {person.name}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        scope={scope}
        page={page}
        pageCount={pageCount}
        totalResults={totalResults}
        start={start}
        end={end}
      />
    </div>
  )
}
