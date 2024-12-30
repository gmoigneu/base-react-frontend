import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'  
import { useProductGroups } from '@/lib/hooks/use-product-groups'
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from 'lucide-react'
import { useDebounce } from '@/lib/hooks/use-debounce'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ProductGroup } from '@/lib/types'

export function ProductGroupsPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 300)
  
  const { productGroups, fetchProductGroups, deleteProductGroup } = useProductGroups()
  
  useEffect(() => {
    fetchProductGroups()
  }, [fetchProductGroups])

  const filteredProductGroups = productGroups.filter((productGroup: ProductGroup) => 
    productGroup.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    productGroup.description.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Product Groups</h2>
        <Button onClick={() => navigate('new')}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Product Group
        </Button>
      </div>

      <Input
        placeholder="Search product groups..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProductGroups.map((productGroup) => (
              <TableRow key={productGroup.id}>
                <TableCell>{productGroup.name}</TableCell>
                <TableCell>{productGroup.description}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`${productGroup.id}`)}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`${productGroup.id}/edit`)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product Group</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this product group? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteProductGroup(productGroup.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 