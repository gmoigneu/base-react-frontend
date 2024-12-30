import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PencilIcon } from 'lucide-react'
import { Product } from '@/lib/types'
import { useProducts } from '@/lib/hooks/use-product'
  
export function ProductView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products } = useProducts()
  
  const product = products.find((p: Product) => parseInt(p.id) === parseInt(id))
  
  if (!product) return null

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Product Details</h2>
        <Button onClick={() => navigate(`/configuration/products/${id}/edit`)}>
          <PencilIcon className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          <div>
            <h3 className="font-medium">Created At</h3>
            <p className="text-muted-foreground">
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="font-medium">Last Updated</h3>
            <p className="text-muted-foreground">
              {new Date(product.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 