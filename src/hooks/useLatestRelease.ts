import { useEffect, useState } from 'react'

export interface ReleaseInfo {
  version: string
  downloadUrl: string
  fileName: string
}

type State =
  | { status: 'loading' }
  | { status: 'ready'; release: ReleaseInfo }
  | { status: 'unavailable' }

const ISO_RE = /vertex-linux-(\d{4})\.(\d{2})\.(\d{2})-x86_64/i

function parseVersion(name: string): string | null {
  const m = ISO_RE.exec(name)
  if (!m) return null
  return `${m[1]}.${m[2]}.${m[3]}`
}

export function useLatestRelease(): State {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    fetch('https://api.github.com/repos/Vertex-Linux/vertex-linux/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => {
        if (!r.ok) throw new Error('no release')
        return r.json()
      })
      .then((data) => {
        if (cancelled) return

        const assets: { name: string; browser_download_url: string }[] =
          data.assets ?? []

        const iso = assets.find((a) => ISO_RE.test(a.name))
        if (!iso) throw new Error('no iso asset')

        const version = parseVersion(iso.name)
        if (!version) throw new Error('bad name')

        setState({
          status: 'ready',
          release: {
            version,
            downloadUrl: iso.browser_download_url,
            fileName: iso.name,
          },
        })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'unavailable' })
      })

    return () => { cancelled = true }
  }, [])

  return state
}
