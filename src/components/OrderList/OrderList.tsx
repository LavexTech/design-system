import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Order, OrderItem } from '../Order/Order'
import { Accordion, AccordionItem } from '../Accordion/Accordion'

type Order = {
	id: number,
	title: string,
	createdAt: Date,
	itemList: OrderItem[],
	images?: string[],
	showTitle?: boolean,
}
type OrderListProps = {
  orders: Order[]
}

export const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <Accordion>
      {orders.map((order) => (
		<AccordionItem key={order.id} title={order.title} id={order.id.toString()}>
          	<Order order={order} showTitle={false} />
		</AccordionItem>
      ))}
	</Accordion>
  )
}