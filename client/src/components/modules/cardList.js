import React from "react";
import Card from "./card";

function CardList({ cardData, pageNumber }) {
  const cards = cardData.data.slice((pageNumber - 1) * 6, ((pageNumber - 1) * 6) + 6);
  return (
    <div className="">
      {cards.map((card, i) => {
        return <Card key={i} card={card} />
      })}
    </div>
  );
}

export default CardList;
