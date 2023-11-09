import CollectionCard from '@/components/CollectionCard'
import CreateColBtn from '@/components/CreateColBtn'
import Rectangle from '@/components/icons/Rectangle'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { DividerHorizontalIcon } from '@radix-ui/react-icons'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeFallback />}>
        <Welcome />
      </Suspense>
      <Suspense fallback={<div>...Loading Collections</div>}>
        <CollectionList />
      </Suspense>
    </>
  )
}

async function Welcome() {
  const user = await currentUser()

  if (!user) {
    return <div>error</div>
  }

  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Welcome,
        <br />
        {user.firstName}
      </h1>
    </div>
  )
}

function WelcomeFallback() {
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[150px] h-[35px]" />
        <Skeleton className="w-[150px] h-[35px]" />
      </h1>
    </div>
  )
}

async function CollectionList() {
  const user = await currentUser()
  const collections = await prisma.collection.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    },
  })

  if (collections.length == 0) {
    return (
      <div className="mt-10 flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <Rectangle />
          <Alert>
            <AlertTitle>There are no collections yet!</AlertTitle>
            <AlertDescription>
              Create a collection to get started
            </AlertDescription>
          </Alert>
        </div>
        <CreateColBtn />
      </div>
    )
  }

  return (
    <>
      <CreateColBtn />
      <div className="flex flex-col gap-4 mt-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  )
}
