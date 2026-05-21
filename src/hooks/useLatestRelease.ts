import { useEffect, useState } from 'react'

export interface ReleaseInfo {
  version:     string
  downloadUrl: string
  fileName:    string
}

type State =
  | { status: 'loading' }
  | { status: 'ready'; release: ReleaseInfo }
  | { status: 'unavailable' }

const API_BASE = 'https://vertexdl.arc360hub.com'

export function useLatestRelease(): State {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    fetch(`${API_BASE}/latest`)
      .then((r) => {
        if (!r.ok) throw new Error('server error')
        return r.json()
      })
      .then((data: { available: boolean; version: string; fileName: string; downloadUrl: string }) => {
        if (cancelled) return
        if (!data.available) throw new Error('no release')

        setState({
          status: 'ready',
          release: {
            version:     data.version,
            downloadUrl: data.downloadUrl,
            fileName:    data.fileName,
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
