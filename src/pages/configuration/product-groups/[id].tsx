import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PencilIcon } from 'lucide-react'
import { ProductGroup } from '@/lib/types'
import { useProductGroups } from '@/lib/hooks/use-product-groups'
  
export function ProductGroupView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { productGroups } = useProductGroups()
  
  const productGroup = productGroups.find((p: ProductGroup) => parseInt(p.id) === parseInt(id))
  
  if (!productGroup) return null

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Product Group Details</h2>
        <Button onClick={() => navigate(`/configuration/product-groups/${id}/edit`)}>
          <PencilIcon className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{productGroup.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Description</h3>
            <p className="text-muted-foreground">{productGroup.description}</p>
          </div>
          <div>
            <h3 className="font-medium">Created At</h3>
            <p className="text-muted-foreground">
              {new Date(productGroup.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="font-medium">Last Updated</h3>
            <p className="text-muted-foreground">
              {new Date(productGroup.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 