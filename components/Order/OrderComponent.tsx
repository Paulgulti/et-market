'use client'
import { Order } from '@/sanity.types'
import React, { useState } from 'react'
import { TableBody, TableCell, TableRow } from '../ui/table'
import { Tooltip, TooltipContent, TooltipProvider } from '../ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { capitalizeFirstLetter, priceFormatter } from '@/lib/utils'
import clsx from 'clsx'
import OrderDetails from './OrderDetails'

const OrderComponent = ({ orders }: { orders: Order[] }) => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    return (
        <>
            <TableBody>
                <TooltipProvider>
                    {orders.map(order =>
                        <Tooltip key={order.orderNumber}>
                            <TooltipTrigger asChild>
                                <TableRow
                                    className='cursor-pointer hover:bg-gray-100'
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    <TableCell className='font-medium'>{order.orderNumber?.slice(-10) ?? 'N/A'}</TableCell>
                                    <TableCell className='hidden md:table-cell'>{new Date(order.orderDate!).toLocaleDateString()}</TableCell>
                                    <TableCell>{order.customerName ?? 'User'}</TableCell>
                                    <TableCell className='hidden md:table-cell'>{order.email}</TableCell>
                                    <TableCell className='text-black font-medium'>{priceFormatter(order.totalPrice!)}</TableCell>
                                    <TableCell className={clsx(
                                        {
                                            'text-green-500': order.status === 'paid',
                                            'text-yellow-500': order.status === 'pending',
                                            'text-red-500': order.status === 'cancelled',
                                            'text-blue-500': order.status === 'shipped',
                                        }
                                    )}>{capitalizeFirstLetter(order.status!)}
                                    </TableCell>
                                    <TableCell className='hidden md:table-cell'>{order.invoice?.number}</TableCell>
                                </TableRow>
                            </TooltipTrigger>
                            <TooltipContent>
                                Click to see order details
                            </TooltipContent>
                        </Tooltip>
                    )}
                </TooltipProvider>
            </TableBody>
            <OrderDetails order={selectedOrder} 
                isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
        </>
    )
}

export default OrderComponent
