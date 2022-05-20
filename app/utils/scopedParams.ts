import { useLocation } from '@remix-run/react'

export function getScopedParams(request: Request, scope: string) {
  const url = new URL(request.url)
  return new URLSearchParams(
    Array.from(url.searchParams.entries())
      .filter(([key]) => key.startsWith(`${scope}:`))
      .map(([key, value]) => [key.replace(`${scope}:`, ''), value]),
  )
}

type ParamsType = Record<string, string | number | boolean | undefined>
export function useScopedParams(scope: string) {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const updateSearchParams = (params: ParamsType) => {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) {
        searchParams.delete(`${scope}:${key}`)
      } else {
        searchParams.set(`${scope}:${key}`, String(value))
      }
    })
  }
  return {
    getParam: (key: string) => searchParams.get(`${scope}:${key}`),
    getScopedSearch: (params: ParamsType) => {
      updateSearchParams(params)
      let search = searchParams.toString()
      if (search) search = '?' + search
      return search
    },
  }
}
