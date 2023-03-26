import { LoadingIcon } from '@/base-components'

function Loading() {
  return (
    <div className="absolute top-0 bottom-0 left-0 z-50 w-full flex items-center justify-center bg-white/70">
      <LoadingIcon icon="ball-triangle" className="w-8 h-8" />
    </div>
  )
}

export default Loading
