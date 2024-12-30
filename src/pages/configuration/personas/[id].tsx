import { useNavigate, useParams } from 'react-router-dom'
import { usePersonas } from '@/lib/hooks/use-model'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PencilIcon } from 'lucide-react'
import { Persona } from '@/lib/types'

export function PersonaView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { personas } = usePersonas()
  
  const persona = personas.find((p: Persona) => parseInt(p.id) === parseInt(id))
  
  if (!persona) return null

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Persona Details</h2>
        <Button onClick={() => navigate(`/configuration/personas/${id}/edit`)}>
          <PencilIcon className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{persona.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Description</h3>
            <p className="text-muted-foreground">{persona.description}</p>
          </div>
          <div>
            <h3 className="font-medium">Created At</h3>
            <p className="text-muted-foreground">
              {new Date(persona.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="font-medium">Last Updated</h3>
            <p className="text-muted-foreground">
              {new Date(persona.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 