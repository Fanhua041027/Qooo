import { PropsWithChildren, useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { track } from '@/utils/analytics'
import './styles/index.scss'

function App({ children }: PropsWithChildren) {
  const initialize = useAuthStore((state) => state.initialize)

  useEffect(() => {
    initialize()
    track('app_launch')
  }, [initialize])

  return children
}

export default App
