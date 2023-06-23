import PageView from './components/PageView'
import GoTo from './components/GoTo'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-10'>
      <div className=''>
        <PageView />
      </div>
      <div className=''>
        <GoTo />
      </div>
    </main>
  )
}
