import { cache, use } from '../../../lib/utils'

export default function Page() {
  const getData = () =>
    fetch('https://example.vercel.sh', {
      next: { revalidate: 0 },
    })
      .then((res) => res.text())
      .then((text) => new Promise((res) => setTimeout(() => res(text), 1000)))
  const dataPromise = cache(getData)
  const data = use(dataPromise)

  return (
    <>
      <p id="page">/ssr-auto/fetch-revalidate-zero</p>
      <div id="example-dat">{data}</div>
      <p id="date">{Date.now()}</p>
    </>
  )
}

// TODO-APP: remove revalidate config once next.revalidate is supported
export const config = {
  revalidate: 0,
}
