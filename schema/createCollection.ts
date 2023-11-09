import { CollectionsCollors } from '@/lib/constants'
import { z } from 'zod'

export const createCollectionSchema = z.object({
  name: z.string().min(4, {
    message: 'Collection name should be at least 4 characters long',
  }),
  color: z
    .string()
    .refine((color) => Object.keys(CollectionsCollors).includes(color)),
})

export type createCollectionSchemaType = z.infer<typeof createCollectionSchema>
