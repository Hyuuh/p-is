'use client'

import { testAtom } from '@/atoms'
import { TestHandler, TestUser } from '@/lib/Tests'
import { ShareFat } from '@phosphor-icons/react'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { v4 as uuid } from 'uuid'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Card, CardContent } from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
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
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

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
  const setTest = useSetAtom(testAtom)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: 0,
      laterality: 'right'
    }
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: 'Se está generando las pruebas...',
      description: 'La redirección puede tardar unos segundos...'
    })
    const user: TestUser = {
      id: uuid(),
      name: values.name,
      age: Number(values.age),
      laterality: values.laterality
    }
    const testHandler = new TestHandler(user)
    testHandler.setup()
    setTest(testHandler)
    setTimeout(() => router.push('/tests'), 2300)
  }
  return (
    <Card className='w-[400px] p-5'>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identidad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Nombre Apellido'
                      className='placeholder:text-center'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Ingrese su nombre y apellido
                  </FormDescription>
                  <FormMessage />
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
                    <Input
                      placeholder='Edad'
                      autoComplete='off'
                      type='text'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Ingrese su edad</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='laterality'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lateralidad</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Lateralidades</SelectLabel>
                        <SelectItem value='right'>Diestro</SelectItem>
                        <SelectItem value='left'>Zurdo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>¿Eres diestro o zurdo?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full' variant={'outline'}>
              <ShareFat size={24} className='mr-2' />
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default FormUser
