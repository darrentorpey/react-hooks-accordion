import React from 'react'

export function useEffectAfterMount(cb: any, dependencies: any[]) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    if (mounted) {
      return cb()
    }

    setMounted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cb, mounted, ...dependencies])
}
