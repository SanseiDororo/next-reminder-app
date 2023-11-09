import { FormProvider, useForm } from 'react-hook-form'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'
import {
  createCollectionSchemaType,
  createCollectionSchema,
} from '@/schema/createCollection'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from './ui/form'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { CollectionColor, CollectionsCollors } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { CreateCollection } from '@/actions/collection'
import { Toast } from './ui/toast'
import { toast } from './ui/use-toast'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CreateCollectionSidebar = ({ open, onOpenChange }: Props) => {
  const form = useForm<createCollectionSchemaType>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {},
  })

  const router = useRouter()

  const onSubmit = async (data: createCollectionSchemaType) => {
    try {
      await CreateCollection(data)

      //Close Sidebar
      openChangeWrapper(false)
      router.refresh()

      toast({
        title: 'Success',
        description: 'Collection Successfully Created',
      })
    } catch (e: any) {
      //show a toast
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  const openChangeWrapper = (open: boolean) => {
    form.reset()
    onOpenChange(open)
  }

  return (
    <Sheet open={open} onOpenChange={openChangeWrapper}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Collection</SheetTitle>
          <SheetDescription>
            Collections are a way to grow your tasks
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="General" {...field} />
                  </FormControl>
                  <FormDescription>Collection Name</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select onValueChange={(color) => field.onChange(color)}>
                      <SelectTrigger
                        className={cn(
                          'w-full h-8 text-white',
                          CollectionsCollors[field.value as CollectionColor]
                        )}
                      >
                        <SelectValue
                          placeholder="Color"
                          className="w-full h-8"
                        ></SelectValue>
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Object.keys(CollectionsCollors).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className={cn(
                              `w-full h-8 roudned-md my-1 text-white  focus:text-white focus:font-bold focus:ring-2 focus:ring-inset dark:focus:ring-white focus:px-8`,
                              CollectionsCollors[color as CollectionColor]
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select a color for your collection
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-col gap-3 mt-4">
          <Separator />
          <Button
            disabled={form.formState.isSubmitting}
            variant={'outline'}
            onClick={form.handleSubmit(onSubmit)}
            className={cn(
              form.watch('color') &&
                CollectionsCollors[form.getValues('color') as CollectionColor]
            )}
          >
            Confirm
            {form.formState.isSubmitting && (
              <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default CreateCollectionSidebar
