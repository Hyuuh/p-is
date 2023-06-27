'use client'

import { TestHandler, TestUser } from '@/lib/Tests'
import { ShareFat } from '@phosphor-icons/react'

import { useRouter } from 'next/navigation'
import { v4 as uuid } from 'uuid'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useTestStore } from '@/lib/stores'

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'El nombre debe tener al menos 3 caracteres'
    })
    .max(20, {
      message: 'El nombre debe tener menos de 20 caracteres'
    }),
  age: z.union([
    z
      .number()
      .int({ message: 'La edad debe ser un número entero' })
      .positive({ message: 'La edad debe ser un número positivo' })
      .min(5, {
        message: 'La edad debe ser mayor a 5'
      })
      .max(100, {
        message: 'La edad debe ser menor a 100'
      }),
    z.nan(),
    z.string()
  ]),
  laterality: z.enum(['left', 'right'])
})
function FormUser() {
  const router = useRouter()
  const testStore = useTestStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: 0,
      laterality: 'right'
    }
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    const user: TestUser = {
      id: uuid(),
      name: values.name,
      age: Number(values.age),
      laterality: values.laterality,
      createdAt: new Date()
    }
    const testHandler = new TestHandler(user)
    testHandler.setup()
    testStore.setTest(testHandler)
    router.push('/tests')
  }
  return (
    <article className='card w-[400px] p-5 bg-base-200 shadow-xl'>
      <section className='card-body'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
            autoComplete='off'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identidad</FormLabel>
                  <FormControl>
                    <input
                      placeholder='Nombre Apellido'
                      className='input input-bordered input-primary placeholder:text-center w-full'
                      {...field}
                      autoComplete='off'
                    />
                  </FormControl>
                  <FormDescription>
                    Ingrese su nombre y apellido
                  </FormDescription>
                  <FormMessage className='text-error'/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='age'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad</FormLabel>
                  <FormControl>
                    <input
                      placeholder='Edad'
                      autoComplete='off'
                      className='input input-bordered input-primary placeholder:text-center w-full'
                      type='number'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Ingrese su edad</FormDescription>
                  <FormMessage className='text-error' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='laterality'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lateralidad</FormLabel>
                  <FormControl>
                    <select
                      className='select select-primary w-full max-w-xs'
                      onChange={field.onChange}
                      defaultValue={field.value}>
                      <option value={'right'}>Diestro</option>
                      <option value={'left'}>Zurdo</option>
                    </select>
                  </FormControl>
                  <FormDescription>¿Eres diestro o zurdo?</FormDescription>
                  <FormMessage className='text-error'/>
                </FormItem>
              )}
            />
            <button type='submit' className='btn btn-secondary w-full'>
              <ShareFat className='w-6 h-6' />
              Submit
            </button>
          </form>
        </Form>
      </section>
    </article>
  )
}

export default FormUser
