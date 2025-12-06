import React from "react"
import { Offer } from "../Offer/Offer"
import { List } from "../List/List"
import { GridItem } from "../Grid/Grid"
import { Grid } from "../Grid/Grid"

type User = {
	id: string,
	name: string,
	profileImage: string,
	ordersCount: number,
	rating: number,
	userType: 'client' | 'provider',
}
  
type OfferProps = {
	id: number,
	amount: number,
	distance: number,
	user: User,
	onClick?: () => void,
}

type OfferListProps = {
	offers: OfferProps[],	
}

export const OfferList: React.FC<OfferListProps> = ({ offers }) => {
  return (
	<Grid columns={1} gap={1}>
      {offers.map((offer) => (
        <GridItem colSpan={1}>
          <Offer
		  	key={offer.id} 
            amount={offer.amount}
            distance={offer.distance}
            user={offer.user}
            onClick={offer.onClick}
            />
        </GridItem>
      ))}
      </Grid>
  )
}