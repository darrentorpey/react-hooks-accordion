import React from 'react'

export function useEffectAfterMount(cb: any) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    if (mounted) {
      return cb()
    }

    setMounted(true)
  }, [cb, mounted])
}
