import update from "immutability-helper";
import { useCallback } from "react";
import CardBanner from "./CardBanner";

const ContainerBanner = ({
  setImageBannerUrl,
  imageBannerUrl,
  handleRemoveImage,
}) => {
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      setImageBannerUrl((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    },
    [setImageBannerUrl]
  );

  const renderCard = useCallback(
    (card, i) => {
      return (
        <CardBanner
          key={i + 1}
          index={i}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
          image={card}
          handleRemoveImage={handleRemoveImage}
        />
      );
    },
    [moveCard, handleRemoveImage]
  );
  return <>{imageBannerUrl.map((card, i) => renderCard(card, i))}</>;
};

export default ContainerBanner;
