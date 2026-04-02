import React from 'react'

const ProductCard = ({prod} : {prod: cartItemsWithAvgStars}) => {

  return (
    <div>{prod.products.name}</div>
  )
  
}

export {ProductCard}