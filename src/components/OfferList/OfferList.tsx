import React from "react"
import { Offer } from "../Offer/Offer"
import { List } from "../List/List"

type User = {
	id: string,
	name: string,
	profileImage: string,
	ordersCount: number,
	rating: number,
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
    <>
	<List title="Ofertas">
      {offers.map((offer) => (
		  <Offer 
		  	key={offer.id} 
			amount={offer.amount} 
			distance={offer.distance} 
			user={offer.user} 
			onClick={offer.onClick} 
			/>
		))}
	</List>
    </>
  )
}