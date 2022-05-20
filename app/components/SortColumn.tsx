import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { Link } from '@remix-run/react'
import { classNames } from '~/utils'
import { useScopedParams } from '~/utils/scopedParams'

export type SortColummProps = {
  scope: string
  name: string
  label: string
}
export default function SortColumn({ scope, name, label }: SortColummProps) {
  const { getParam, getScopedSearch } = useScopedParams(scope)
  const sort = getParam('sort') || 'name'
  const order = getParam('order') || 'asc'
  const newOrder = sort === name ? (order === 'asc' ? 'desc' : 'asc') : 'asc'
  return (
    <th
      scope="col"
      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
    >
      <Link
        to={getScopedSearch({
          sort: name,
          order: newOrder,
        })}
        className="group inline-flex"
      >
        {label}
        <span
          className={classNames(
            'ml-2 flex-none rounded text-gray-400 group-hover:visible',
            sort !== name && 'invisible',
          )}
        >
          {order === 'asc' ? (
            <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </span>
      </Link>
    </th>
  )
}
