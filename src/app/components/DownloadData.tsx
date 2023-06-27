'use client'

import { useTestsStore } from '@/lib/stores'
import { CloudArrowDown } from '@phosphor-icons/react'
import { MouseEvent, useState } from 'react'
import { sendNotification } from '@tauri-apps/api/notification'
import clsx from 'clsx'

export default function DownloadData() {
  const [clear, setClear] = useState(false)
  const testsStore = useTestsStore()
  const download = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // check if user press shift + click when click on button
    if (event.shiftKey) {
      // clear tests
      testsStore.setTests([])
      setClear(true)
      setTimeout(() => {
        setClear(false)
      }, 2000)
      return sendNotification('Datos borrados')
    }
    if (!testsStore.tests.length) return alert('No hay datos para descargar.')
    const headers = [
      'fecha',
      'nombre',
      'edad',
      'lateralidad',
      '1º Prueba',
      '2º Prueba',
      '3º Prueba'
    ]
    let contenido = '\ufeff' + headers.join(';') + '\n'
    for (const test of testsStore.tests) {
      const formatDate = (date: Date) => {
        const itdl = Intl.DateTimeFormat('es-ES', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
        return itdl.format(date)
      }
      const row = [
        formatDate(test.user.createdAt),
        test.user.name,
        test.user.age,
        test.user.laterality == 'left' ? 'zurdo' : 'diestro',
        test.tests[0].raw,
        test.tests[1].raw,
        test.tests[2].raw
      ]
      contenido += row.join(';') + ';\n'
    }
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'datos.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={download as any}
      className={clsx('btn join-item', {
        'bg-error': clear
      })}>
      <CloudArrowDown className='w-6 h-6' />
      Descargar Datos
    </button>
  )
}
