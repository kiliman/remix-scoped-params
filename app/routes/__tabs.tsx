import { Tab } from '@headlessui/react'
import { Link, Outlet, useLocation } from '@remix-run/react'
import { Fragment } from 'react'
import { classNames } from '~/utils'
const tabs = {
  tab1: 'Tab 1',
  tab2: 'Tab 2',
  tab3: 'Tab 3',
}

export default function Index() {
  const location = useLocation()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Remix Scoped Params</h1>
      <Tab.Group as="div">
        <Tab.List
          className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
          aria-label="Tabs"
        >
          {Object.entries(tabs).map(([key, value], index) => (
            <Tab as={Fragment} key={key}>
              {({ selected }) => (
                <Link
                  to={`${key}${location.search}`}
                  className={classNames(
                    selected
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700',
                    index === 0 ? 'rounded-l-lg' : '',
                    index === Object.keys(tabs).length - 1
                      ? 'rounded-r-lg'
                      : '',
                    'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 focus:outline-none',
                  )}
                >
                  <span>{value}</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      selected ? 'bg-indigo-500' : 'bg-transparent',
                      'absolute inset-x-0 bottom-0 h-0.5',
                    )}
                  />
                </Link>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Outlet />
      </Tab.Group>
    </div>
  )
}
