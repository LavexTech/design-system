import React from 'react'
import { StyleSheet } from 'react-native'
import { Grid, GridItem } from '../Grid/Grid'
import { Subtitle } from '../Subtitle/Subtitle'
import { TextBox as Text } from '../Text/Text'
import { Info } from '../Info/Info'
import { Gallery } from '../Gallery/Gallery'
import { TextList } from '../TextList/TextList'
import Constants from '../../constants/constants'

export type OrderItem = {
  quantity: number,
  name: string,
}

type Order = {
  id: number,
  title: string,
  createdAt: Date,
  itemList: OrderItem[],
  images?: string[],
}

type OrderProps = {
  order: Order,
  showTitle?: boolean,
}

export const Order: React.FC<OrderProps> = ({ order, showTitle = true }) => {
  const formatDate = (date: Date): string => {
    return `Criado em ${date.toLocaleDateString('pt-BR')}`;
  };

  return (
      <>
      <Grid columns={1} gap={4}>
        <GridItem>
          {showTitle && <Subtitle text={order.title} />}
          <Info text={formatDate(order.createdAt)} />
        </GridItem>
        
        {order.images && (
          <Gallery images={order.images} />
        )}

        <GridItem>
          <Text text={"Itens do pedido:"} size="small" />
          <TextList texts={order.itemList.map((item) => `${item.quantity}x ${item.name}`)} />
        </GridItem>
      </Grid>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: Constants.styles.spacing.MEDIUM,
  },
});