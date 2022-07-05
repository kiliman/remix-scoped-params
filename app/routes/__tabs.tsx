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
      <h1 className="text-2xl font-bold mb-4">
        <Link to="/">Remix Scoped Params</Link>
      </h1>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 block underline mb-4"
        href="https://github.com/kiliman/remix-scoped-params"
      >
        https://github.com/kiliman/remix-scoped-params
      </a>
      <p className="mb-4">
        Each tab can be paged, sorted, and filtered independently. The{' '}
        <code>searchParams</code> are <i>scoped</i> per tab, so you can navigate
        between tabs and still maintain the <code>searchParams</code>.
      </p>
      <Tab.Group
        as="div"
        key={location.pathname}
        defaultIndex={Object.keys(tabs).indexOf(location.pathname.substring(1))}
      >
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
