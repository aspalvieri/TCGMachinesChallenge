import React from "react";

function Card({ card }) {
  //Incase a card has a front and a back, we need to account for that
  let images = [];
  if (!card.image_uris) {
    images.push(card.card_faces[0].image_uris.small);
    images.push(card.card_faces[1].image_uris.small);
  }
  else {
    images.push(card.image_uris.small);
  }

  const rarities = {
    "common": "border-stone-300",
    "uncommon": "border-sky-200",
    "rare": "border-amber-300",
    "mythic": "border-red-300"
  }

  return (
    <div className={`inline-block w-[100%] shadow mx-0 md:w-[49%] md:mx-[0.5%] lg:w-[32.3%] rounded ${rarities[card.rarity]} border border-2 my-1 p-2 text-center`}>
        <p className="font-bold text-lg truncate hover:overflow-visible hover:whitespace-normal">{card.name}</p>
        {images.map((image, i) => {
          return (<img className="inline-block" key={i} src={image} alt={card.name} />);
        })}
        <br/>
        <div className="text-center inline-block mx-auto w-full">
          <p><b>Card Number:</b> {card.collector_number}</p>
          <p className="truncate hover:overflow-visible hover:whitespace-normal"><b>Set:</b> {card.set_name}</p>
          <p><b>Rarity:</b> {card.rarity}</p>
        </div>
    </div>
  );
}

export default Card;
