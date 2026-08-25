import React, { useCallback, useEffect, useMemo } from 'react'
import {
  StyleSheet,
  View,
  Pressable,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  BackHandler,
  Platform,
} from 'react-native'
import { Grid, GridItem } from '../Grid/Grid'
import { Card } from '../Card/Card'
import { Subtitle } from '../Subtitle/Subtitle'
import { TextBox as Text } from '../Text/Text'
import { Info } from '../Info/Info'
import { Gallery } from '../Gallery/Gallery'
import { TextList } from '../TextList/TextList'
import { IconChevronLeft } from '../Icons/IconChevronLeft'
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
  /**
   * When set, shows a chevron-left beside the title and enables left-edge
   * swipe-back. Invoked on back (same idea as Android hardware back).
   */
  backTarget?: () => void,
}

const EDGE_WIDTH = 24
const SWIPE_DISTANCE = 80
const SWIPE_VELOCITY = 0.6

export const Order: React.FC<OrderProps> = ({ order, backTarget }) => {
  const formatDate = (date: Date): string => {
    return `Criado em ${date.toLocaleDateString('pt-BR')}`;
  };

  const handleBack = useCallback(() => {
    if (backTarget) {
      backTarget()
    }
  }, [backTarget])

  useEffect(() => {
    if (!backTarget || Platform.OS !== 'android') {
      return undefined
    }

    const onHardwareBack = () => {
      handleBack()
      return true
    }

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onHardwareBack,
    )
    return () => subscription.remove()
  }, [backTarget, handleBack])

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt: GestureResponderEvent) => {
          if (!backTarget) {
            return false
          }
          return evt.nativeEvent.locationX <= EDGE_WIDTH
        },
        onMoveShouldSetPanResponder: (
          evt: GestureResponderEvent,
          gestureState: PanResponderGestureState,
        ) => {
          if (!backTarget) {
            return false
          }
          const fromEdge =
            evt.nativeEvent.pageX - gestureState.dx <= EDGE_WIDTH * 2
          return (
            fromEdge && gestureState.dx > 8 && Math.abs(gestureState.dy) < 20
          )
        },
        onPanResponderRelease: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState,
        ) => {
          if (!backTarget) {
            return
          }
          if (
            gestureState.dx > SWIPE_DISTANCE ||
            gestureState.vx > SWIPE_VELOCITY
          ) {
            handleBack()
          }
        },
      }),
    [backTarget, handleBack],
  )

  const titleRow = (
    <View style={styles.titleRow}>
      {backTarget ? (
        <Pressable
          onPress={handleBack}
          hitSlop={12}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <IconChevronLeft
            size={24}
            color={Constants.styles.textColor.DEFAULT}
          />
        </Pressable>
      ) : null}
      <View style={styles.titleText}>
        <Subtitle text={order.title} />
      </View>
    </View>
  )

  const content = (
    <Card>
      <Grid columns={1} gap={4}>
        <GridItem>
          {titleRow}
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
    </Card>
  )

  if (!backTarget) {
    return content
  }

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {content}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Constants.styles.spacing.TINY,
  },
  backButton: {
    marginRight: Constants.styles.spacing.SMALL,
    padding: Constants.styles.spacing.TINY,
  },
  titleText: {
    flex: 1,
  },
});
