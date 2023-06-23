import DownloadData from './components/DownloadData'
import StartButton from './components/StartButton'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-10 dark:text-white text-black'>
      <article className=''>
        <h3 className='text-8xl font-bold uppercase tracking-widest font-bespoke'>
          Bienvenido/a
        </h3>
      </article>
      <article className='flex gap-4'>
        <StartButton />
        <DownloadData />
      </article>
    </main>
  )
}
