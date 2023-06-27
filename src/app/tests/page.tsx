import PageView from './components/PageView'
import GoTo from './components/GoTo'

export default function Home() {
  return (
    <main className='hero min-h-screen'>
      <div className='hero-content text-center'>
        <article className='max-w-none flex flex-col prose'>
          <PageView />
          <div className=''>
            <GoTo />
          </div>
        </article>
      </div>
    </main>
  )
}
