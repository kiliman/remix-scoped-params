export function getRandom(start: number, end: number) {
  return Math.floor(Math.random() * (end - start)) + start
}
export function range(start: number, end: number, step: number = 1) {
  return Array.from(
    { length: (end - start + 1) / step },
    (_, i) => start + i * step,
  )
}

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
