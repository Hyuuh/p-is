import DownloadData from './components/DownloadData'
import StartButton from './components/StartButton'

export default function Home() {
  return (
    <main className='hero min-h-screen'>
      <div className='hero-content text-center'>
        <article className='prose lg:proxe-xl max-w-none'>
          <h3 className='text-5xl md:text-7xl lg:text-8xl font-bold uppercase md:tracking-widest font-bespoke'>
            Bienvenido<span className='text-primary'>/</span>a
          </h3>
          <div className='join'>
            <StartButton />
            <DownloadData />
          </div>
        </article>
      </div>
    </main>
  )
}
