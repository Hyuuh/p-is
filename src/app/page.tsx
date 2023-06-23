import DownloadData from './components/DownloadData'
import StartButton from './components/StartButton'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-10 dark:text-white text-black'>
      <article className=''>
        <h3 className='text-5xl md:text-7xl lg:text-8xl font-bold uppercase md:tracking-widest font-bespoke'>
          Bienvenido<span className='dark:text-emerald-400 text-emerald-600'>/</span>a
        </h3>
      </article>
      <article className='flex flex-col md:flex-row gap-4'>
        <StartButton />
        <DownloadData />
      </article>
    </main>
  )
}
