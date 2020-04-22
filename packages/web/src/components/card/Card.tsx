import React, { Component } from "react";
import { CardType } from "@codenames/common";

import { Card as BootstrapCard } from "react-bootstrap";

import blueImage from "../../assets/images/blue.jpeg";
import redImage from "../../assets/images/red.jpeg";
import civilianImage from "../../assets/images/civilian.jpg";
import assasinImage from "../../assets/images/assasin.jpg";
import defaultImage from "../../assets/images/default.jpg";

import { ICard } from "src/stores/models/ICard";

interface IProps {
  card: ICard;
  onClick: Function;
}

class Card extends Component<IProps, {}> {
  constructor(props: Readonly<IProps>) {
    super(props);
  }

  onClick(word: string) {
    this.props.onClick(word);
  }

  render() {
    const { card } = this.props;

    let cardStyle = { width: "11rem" };
    if (card.type !== undefined && !card.chosen) {
      cardStyle["boxShadow"] = `0 0 2rem ${this.cardHighlightColour(card)}`;
      cardStyle["border"] = `0.5rem solid ${this.cardHighlightColour(card)}`;
      cardStyle["borderRadius"] = "5px";
    }

    return (
      <BootstrapCard
        onClick={() => this.onClick(card.word)}
        style={cardStyle}
        key={card.word}
      >
        <BootstrapCard.Img
          variant="top"
          src={this.cardImage(card)}
          style={{ height: "11rem" }}
        />
        <BootstrapCard.Body>
          <BootstrapCard.Title>{card.word}</BootstrapCard.Title>
        </BootstrapCard.Body>
      </BootstrapCard>
    );
  }

  private cardHighlightColour(card: ICard): string {
    switch (card.type) {
      case CardType.Assasin:
        return "#000000";
      case CardType.Blue:
        return "#0000FF";
      case CardType.Red:
        return "#FF0000";
      case CardType.Civilian:
        return "#E1C699";
      default:
        console.log("should not hit this");
        return "#FFFFFF";
    }
  }

  private cardImage(card: ICard): string {
    if (!card.chosen) {
      return defaultImage;
    }

    switch (card.type) {
      case CardType.Assasin:
        return assasinImage;
      case CardType.Blue:
        return blueImage;
      case CardType.Red:
        return redImage;
      case CardType.Civilian:
        return civilianImage;
      default:
        return defaultImage;
    }
  }
}

export default Card;
