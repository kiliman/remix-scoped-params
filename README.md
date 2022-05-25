# Remix Scoped Params

This example shows how to the the `useScopedParams` hook and the
`getScopedParams` function to manage search params across multiple
routes by scope.

This example has three separate tabs, and in each tab, you can page
through the data and sort by column. The scoped params will encode
the current page and sort info for each tab, so that you can easily
navigate to another tab without losing the previous tabs params.

Each tab has it's own `scope` that is used as a prefix to the search
params.

See example at https://remix-scoped-params-production.up.railway.app
