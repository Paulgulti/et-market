import { auth } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {

    const { userId } = await auth();

    if (!userId) {
        return <div> Sign in before adding item to a cart </div>
    }
  return (
    <div>
      Cart page
    </div>
  )
}

export default page
