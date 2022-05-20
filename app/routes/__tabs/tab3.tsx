import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import Pagination from '~/components/Pagination'
import SortColumn from '~/components/SortColumn'
import type { Person } from '~/models/people'
import { getPeople } from '~/models/people'
import { getScopedParams } from '~/utils/scopedParams'

const SCOPE = 'tab3'
const PEOPLE_COUNT = 25

type LoaderType = {
  people: Person[]
  pageCount: number
  page: number
  totalResults: number
  start: number
  end: number
}

export const loader: LoaderFunction = async ({ request }) => {
  const scopedParams = getScopedParams(request, SCOPE)
  const page = Number(scopedParams.get('page')) || 1
  const sort = scopedParams.get('sort') || 'name'
  const order = scopedParams.get('order') || 'asc'
  const { people, pageCount, totalResults } = getPeople(
    SCOPE,
    PEOPLE_COUNT,
    page,
    sort,
    order,
  )

  const start = (page - 1) * 10 + 1
  const end = Math.min(page * 10, totalResults)
  return json({ people, pageCount, page, totalResults, start, end })
}

export default function () {
  const { people, pageCount, page, totalResults, start, end } =
    useLoaderData<LoaderType>()

  return (
    <div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <SortColumn scope={SCOPE} name="name" label="Name" />
                    <SortColumn scope={SCOPE} name="title" label="Title" />
                    <SortColumn scope={SCOPE} name="email" label="Email" />
                    <SortColumn scope={SCOPE} name="role" label="Role" />
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
        scope={SCOPE}
        page={page}
        pageCount={pageCount}
        totalResults={totalResults}
        start={start}
        end={end}
      />
    </div>
  )
}
