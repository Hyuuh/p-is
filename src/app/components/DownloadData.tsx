'use client'

import { testsAtom } from '@/atoms'
import { Button } from '@/components/ui/button'
import { TestJSON } from '@/lib/Tests'
import { CloudArrowDown } from '@phosphor-icons/react'
import { useSetAtom } from 'jotai'

export default function DownloadData() {
  const setTests = useSetAtom(testsAtom)
  const download = () => {
    const testsString = localStorage.getItem('tests')

    if (!testsString) return alert('No hay datos para descargar :)')
    const headers = [
      'nombre',
      'edad',
      'lateralidad',
      'prueba1',
      'prueba2',
      'prueba3'
    ]
    let contenido = '\ufeff' + headers.join(';') + '\n'
    const tests: TestJSON[] = JSON.parse(testsString)
    setTests(tests)
    for (const test of tests) {
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
    <Button onClick={download} variant={'default'} className='dark:bg-emerald-400 bg-emerald-600'>
      <CloudArrowDown size={24} className='mr-2'/>
			Descargar Datos
    </Button>
  )
}
