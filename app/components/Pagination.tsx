import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { Link } from '@remix-run/react'
import { classNames, range } from '~/utils'
import { useScopedParams } from '~/utils/scopedParams'

export type PaginationProps = {
  scope: string
  page: number
  pageCount: number
  totalResults: number
  start: number
  end: number
}

export default function Pagination({
  scope,
  page,
  pageCount,
  totalResults,
  start,
  end,
}: PaginationProps) {
  const { getScopedSearch } = useScopedParams(scope)
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <Link
          to="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          to="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{start}</span> to{' '}
            <span className="font-medium">{end}</span> of{' '}
            <span className="font-medium">{totalResults}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {page > 1 ? (
              <Link
                to={getScopedSearch({ page: page - 1 })}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
            ) : (
              <div className="cursor:not-allowed relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-500 ">
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            )}
            {range(1, pageCount).map(p => (
              <Link
                key={p}
                to={getScopedSearch({ page: p })}
                aria-current="page"
                className={classNames(
                  page === p &&
                    'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page !== p &&
                    'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                )}
              >
                {p}
              </Link>
            ))}
            {page < pageCount ? (
              <Link
                to={getScopedSearch({ page: page + 1 })}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
            ) : (
              <div className="cursor:not-allowed relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-500 ">
                <span className="sr-only">Next</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
