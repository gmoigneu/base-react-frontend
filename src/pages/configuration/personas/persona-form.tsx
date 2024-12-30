import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { usePersonas } from '@/lib/hooks/use-model'
import { Persona } from '@/lib/types'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
})

export function PersonaForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { personas, createPersona, updatePersona } = usePersonas()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  useEffect(() => {
    if (id) {
      const persona = personas.find((p: Persona) => parseInt(p.id) === parseInt(id))
      if (persona) {
        form.reset({
          name: persona.name,
          description: persona.description,
        })
      }
    }
  }, [id, personas, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (id) {
        await updatePersona(id, values)
      } else {
        await createPersona(values)
      }
      navigate('/configuration/personas')
    } catch (error) {
      console.error('Failed to save persona:', error)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">
        {id ? 'Edit' : 'Create'} Persona
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit">Save</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/configuration/personas')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
} 