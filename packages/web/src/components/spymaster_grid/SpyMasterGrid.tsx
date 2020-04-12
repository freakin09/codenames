import React, { Component } from "react";

import { Card as BootstrapCard } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Message, Segment } from "semantic-ui-react";

import { CardType } from "@codenames/common";

import { ICard } from "src/stores/models/ICard";

import blueImage from "../../assets/images/blue.jpeg";
import redImage from "../../assets/images/red.jpeg";
import civilianImage from "../../assets/images/civilian.jpg";
import assasinImage from "../../assets/images/assasin.jpg";

interface IProps {
  cards: ICard[];
}

interface IState {
  typeTable: CardType[][];
}

class SpyMasterGrid extends Component<IProps, IState> {
  //TODO: move to const file
  COLS = 5;

  constructor(props: IProps) {
    super(props);

    this.state = { typeTable: this.typeTable(this.props.cards) };
  }

  private typeTable(cards: ICard[]): CardType[][] {
    let returnedArray: CardType[][] = [];
    let currentArray: CardType[] = [];

    cards.forEach((card, index) => {
      if (card.type == null) {
        throw new Error(`Missing type for card ${card.word}`);
      }

      currentArray.push(card.type);

      if (index !== 0 && (index + 1) % this.COLS === 0) {
        returnedArray.push(currentArray);
        currentArray = [];
      }
    });

    return returnedArray;
  }

  render() {
    return (
      <>
        <Message as="h4" attached="top">
          Spy Masters Grid
        </Message>
        <Segment attached={true}>
          {this.state.typeTable.map((typeArr) => (
            <Row>
              {typeArr.map((type) => {
                return (
                  <Col md="auto">
                    <BootstrapCard style={{ width: "5rem" }}>
                      <BootstrapCard.Img src={this.typeImage(type)} />
                    </BootstrapCard>
                  </Col>
                );
              })}
            </Row>
          ))}
        </Segment>
      </>
    );
  }

  private typeImage(type: CardType): string {
    switch (type) {
      case CardType.Assasin:
        return assasinImage;
      case CardType.Blue:
        return blueImage;
      case CardType.Red:
        return redImage;
      case CardType.Civilian:
        return civilianImage;
      default:
        console.log("should not be reached");
        return "";
    }
  }
}

export default SpyMasterGrid;
