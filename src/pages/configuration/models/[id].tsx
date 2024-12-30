import { useNavigate, useParams } from 'react-router-dom'
import { useModels } from '@/lib/hooks/use-model'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PencilIcon } from 'lucide-react'
import { Model } from '@/lib/types'

export function ModelView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { models } = useModels()
  
  const model = models.find((m: Model) => parseInt(m.id) === parseInt(id))
  
  if (!model) return null

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Model Details</h2>
        <Button onClick={() => navigate(`/configuration/models/${id}/edit`)}>
          <PencilIcon className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{model.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Description</h3>
            <p className="text-muted-foreground">{model.description}</p>
          </div>
          <div>
            <h3 className="font-medium">Created At</h3>
            <p className="text-muted-foreground">
              {new Date(model.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="font-medium">Last Updated</h3>
            <p className="text-muted-foreground">
              {new Date(model.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 