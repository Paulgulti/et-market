import OrderComponent from '@/components/Order/OrderComponent'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getMyOrders } from '@/sanity/live'
import { auth } from '@clerk/nextjs/server'
import { FileX } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const { userId } = await auth()
  if (!userId) {
    return redirect('/')
  }
  const orders = await getMyOrders(userId)
  // console.log(orders);

  return (
    <div className=''>
      {orders?.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Your Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea>
              <Table className=''>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Number</TableHead>
                    <TableHead className='hidden md:table-cell'>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className='hidden md:table-cell'>Email</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='hidden md:table-cell'>Invoice Number</TableHead>
                  </TableRow>
                </TableHeader>
                <OrderComponent orders={orders}/>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <div className='h-screen flex flex-col justify-center items-center '>
          <FileX className='w-24 h-24 text-gray-400' />
          <h3 className='font-semibold'>No orders found</h3>
          <p className='text-gray-700 mb-4 text-sm md:text-md max-w-[240px] text-center'>It looks like you haven&apos;t placed any orders yet. Start shooping</p>
          <Button asChild>
            <Link href={'/'}>Start shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default page
