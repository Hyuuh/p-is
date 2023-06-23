'use client'

import { useTestsStore } from '@/lib/stores'
import { Button } from '@/components/ui/button'
import { CloudArrowDown } from '@phosphor-icons/react'

export default function DownloadData() {
  const testsStore = useTestsStore()
  const download = () => {
    if (!testsStore.tests.length) return alert('No hay datos para descargar.')
    const headers = [
      'nombre',
      'edad',
      'lateralidad',
      '1º Prueba',
      '2º Prueba',
      '3º Prueba'
    ]
    let contenido = '\ufeff' + headers.join(';') + '\n'
    for (const test of testsStore.tests) {
      const row = [
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
    <Button onClick={download} className='dark:bg-emerald-400 bg-emerald-600'>
      <CloudArrowDown size={24} className='mr-2' />
      Descargar Datos
    </Button>
  )
}
