import React from 'react'
import { StyleSheet } from 'react-native'
import { Grid, GridItem } from '../Grid/Grid'
import { Card } from '../Card/Card'
import { Subtitle } from '../Subtitle/Subtitle'
import { TextBox as Text } from '../Text/Text'
import { Info } from '../Info/Info'
import { Gallery } from '../Gallery/Gallery'
import { TextList } from '../TextList/TextList'
import Constants from '../../constants/constants'

type OrderItem = {
  quantity: number,
  name: string,
}

type OrderProps = {
  title: string,
  createdAt: Date,
  itemList: OrderItem[],
  images?: string[],
}

export const Order: React.FC<OrderProps> = ({ title, createdAt, itemList, images }) => {
  const formatDate = (date: Date): string => {
    return `Criado em ${date.toLocaleDateString('pt-BR')}`;
  };

  return (
    <Card>
      <Grid columns={1} gap={4}>
        <GridItem>
          <Subtitle text={title} />
          <Info text={formatDate(createdAt)} />
        </GridItem>
        
        {images && (
          <Gallery images={images} />
        )}

        <GridItem>
          <Text text={"Itens do pedido:"} size="small" />
          <TextList texts={itemList.map((item) => `${item.quantity}x ${item.name}`)} />
        </GridItem>
      </Grid>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: Constants.styles.spacing.MEDIUM,
  },
});