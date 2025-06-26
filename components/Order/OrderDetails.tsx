import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Order } from '@/sanity.types'
import { Button } from '../ui/button';
import clsx from 'clsx';
import { capitalizeFirstLetter, priceFormatter } from '@/lib/utils';
import Link from 'next/link';
// import { DialogContent } from '@radix-ui/react-dialog';

interface OrderDetailProps {
    order: Order | null,
    isOpen: boolean,
    onClose: () => void,
}

const OrderDetails = ({ order, isOpen, onClose }: OrderDetailProps) => {
    if (!order) {
        return null;
    }
    // console.log(order.products?.map(pr => pr.product?._ref));

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='max-w-[300px] md:max-w-xl max-h-[90vh] overflow-y-scroll'>
                <DialogHeader>
                    <DialogTitle className='text-sm md:text-lg'>
                        Order Details - {order.orderNumber}
                    </DialogTitle>
                </DialogHeader>
                <div className='space-y-1 '>
                    <p className='font-medium text-sm md:text-md'>Customer:<span className='font-normal text-gray-700'>&nbsp;{order.customerName || 'User'}</span></p>
                    <p className='font-medium text-sm md:text-md'>Email:<span className='font-normal text-gray-700'>&nbsp;{order.email}</span></p>
                    <p className='font-medium text-sm md:text-md'>Date:<span className='font-normal text-gray-700'>&nbsp;{new Date(order.orderDate!).toLocaleDateString()}</span></p>
                    <p className='font-medium text-sm md:text-md'>Status:
                        <span className={clsx(
                            'font-normal',
                            {
                                'text-green-500': order.status === 'paid',
                                'text-yellow-500': order.status === 'pending',
                                'text-red-500': order.status === 'cancelled',
                                'text-blue-500': order.status === 'shipped',
                            }
                        )}
                        >&nbsp;{capitalizeFirstLetter(order.status!)}
                        </span>
                    </p>
                    <p className='font-medium text-sm md:text-md'>Invoice Number:<span className='font-normal text-gray-700'>&nbsp;{order.invoice?.number}</span></p>
                    <Button asChild className='cursor-pointer' variant={'outline'}>
                        {order.invoice?.hosted_invoice_url && (
                            <Link href={order.invoice.hosted_invoice_url} target='blank'>
                                Download Invoice
                            </Link>
                        )}
                    </Button>
                    {/* <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.products?.map((product, index) =>

                                <TableRow key={index}>
                                    <TableCell>
                                        {product.product?._ref}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table> */}
                    <div className='flex justify-end text-right'>
                        <div>
                            <div>
                                {order.totalPrice && order.amountDiscount?  (
                                    <p className='font-medium text-sm md:text-md'>Total Amount before discount:&nbsp; <span className='line-through font-normal text-gray-700'>{priceFormatter(order.totalPrice)}</span></p>
                                ) : (
                                    <p className='font-medium text-sm md:text-md'>Total Amount paid:&nbsp; <span className='font-normal'>{priceFormatter(order.totalPrice!)}</span></p>
                                )}
                            </div>
                            <div>
                                {order.amountDiscount !== 0 && (
                                    <p className='font-medium text-sm md:text-md'>Discount:&nbsp; <span className='font-normal'>{priceFormatter(order.amountDiscount!)}</span></p>
                                )}
                            </div>
                            <div>
                                {order.amountDiscount !== 0 && order.totalPrice && (
                                    <p className='font-medium text-sm md:text-md'>Subtotal paid:&nbsp; <span className='font-normal'>{priceFormatter(order.totalPrice! - order.amountDiscount!)}</span></p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default OrderDetails
