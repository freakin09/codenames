import React, { Component } from "react";

import { ICard } from "src/stores/models/ICard";
import Card from "../card/Card";
import { Row, Col } from "react-bootstrap";

interface IProps {
  cards: ICard[];
  onCardClick: Function;
}

interface IState {
  cardTable: ICard[][];
}

class GameGrid extends Component<IProps, IState> {
  //TODO: generallize
  COLS = 5;

  constructor(props: IProps) {
    super(props);

    this.state = { cardTable: this.cardTable(this.props.cards) };
  }

  private cardTable(cards: ICard[]): ICard[][] {
    let returnedArray: ICard[][] = [];
    let currentArray: ICard[] = [];

    cards.forEach((card, index) => {
      currentArray.push(card);

      if (index !== 0 && (index + 1) % this.COLS === 0) {
        returnedArray.push(currentArray);
        currentArray = [];
      }
    });

    return returnedArray;
  }

  componentDidUpdate(prevProps: any) {
    if (this.props !== prevProps) {
      this.setState({
        ...this.state,
        cardTable: this.cardTable(this.props.cards),
      });
    }
  }

  render() {
    const { onCardClick } = this.props;

    return this.state.cardTable.map((cards) => (
      <Row>
        {cards.map((card) => {
          return (
            <Col md="auto">
              <Card key={card.word} card={card} onClick={onCardClick} />
            </Col>
          );
        })}
      </Row>
    ));
  }
}

export default GameGrid;
