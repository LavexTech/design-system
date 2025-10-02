import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ImageStyle } from 'react-native';
import Constants from '../../constants/constants';
import { Grid } from '../Grid/Grid';

export interface OrderItem {
  quantity: number;
  name: string;
}

export interface OrderProps {
  title: string;
  createdAt: Date;
  itemList: OrderItem[];
  images?: string[];
}

export const Order: React.FC<OrderProps> = ({ title, createdAt, itemList, images }) => {
  const formatDate = (date: Date): string => {
    return `Criado em ${date.toLocaleDateString('pt-BR')}`;
  };

  const renderImages = () => {
    if (!images || images.length === 0) return null;

    return (
      <View style={styles.imagesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map((imageUrl, index) => (
            <Image
              key={index}
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderItemList = () => {
    return (
      <View style={styles.itemListContainer}>
        <Text style={styles.itemListTitle}>Itens do pedido:</Text>
        {itemList.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemQuantity}>{item.quantity}x</Text>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Grid columns={1} gap={Constants.styles.spacing.MEDIUM}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.createdAt}>{formatDate(createdAt)}</Text>
        </View>
        
        {renderImages()}
        {renderItemList()}
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
    borderWidth: Constants.styles.borderWidth.THIN,
    borderColor: Constants.styles.borderColor.LIGHT,
  },
  header: {
    gap: Constants.styles.spacing.TINY,
  },
  title: {
    fontSize: Constants.styles.fontSize.LARGE,
    fontWeight: Constants.styles.fontWeight.BOLD as any,
    fontFamily: Constants.styles.fontFamily.BOLD,
    color: Constants.styles.textColor.DEFAULT,
  },
  createdAt: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontWeight: Constants.styles.fontWeight.NORMAL as any,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.INFO,
  },
  imagesContainer: {
    gap: Constants.styles.spacing.SMALL,
  },
  image: {
    width: Constants.styles.imageSize.SMALL,
    height: Constants.styles.imageSize.SMALL,
    borderRadius: Constants.styles.borderRadius.SMALL,
    marginRight: Constants.styles.spacing.SMALL,
  } as ImageStyle,
  itemListContainer: {
    gap: Constants.styles.spacing.SMALL,
  },
  itemListTitle: {
    fontSize: Constants.styles.fontSize.MEDIUM,
    fontWeight: Constants.styles.fontWeight.BOLD as any,
    fontFamily: Constants.styles.fontFamily.BOLD,
    color: Constants.styles.textColor.DEFAULT,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemQuantity: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontWeight: Constants.styles.fontWeight.BOLD as any,
    fontFamily: Constants.styles.fontFamily.BOLD,
    color: Constants.styles.textColor.DEFAULT,
    marginRight: Constants.styles.spacing.SMALL,
    minWidth: Constants.styles.minWidth.QUANTITY,
  },
  itemName: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontWeight: Constants.styles.fontWeight.NORMAL as any,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    flex: 1,
  },
});