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
import { useProducts } from '@/lib/hooks/use-product'
import { Product } from '@/lib/types'
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  productGroupId: z.string().min(1, 'Product Group is required'),
  available: z.boolean().default(true),
  sku: z.string().min(1, 'SKU is required'),
  variance: z.string(),
})

export function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, createProduct, updateProduct } = useProducts()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      productGroupId: '',
      available: true,
      sku: '',
      variance: '',
    },
  })

  useEffect(() => {
    if (id) {
      const product = products.find((i: Product) => parseInt(i.id) === parseInt(id))
      if (product) {
        form.reset({
          name: product.name,
          description: product.description,
          productGroupId: product.product_group_id,
          available: product.available,
          sku: product.sku,
          variance: product.variance,
        })
      }
    }
  }, [id, products, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (id) {
        await updateProduct(id, values)
      } else {
        await createProduct(values)
      }
      navigate('/configuration/products')
    } catch (error) {
      console.error('Failed to save product:', error)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">
        {id ? 'Edit' : 'Create'} Product
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

          <FormField
            control={form.control}
            name="productGroupId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Group</FormLabel>
                <FormControl>
                  <Select {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available</FormLabel>
                <FormControl>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="variance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variance</FormLabel>
                <FormControl>
                  <Input {...field} />
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
              onClick={() => navigate('/configuration/products')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
} 