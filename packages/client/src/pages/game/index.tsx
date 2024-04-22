import React, { FC, useState, useEffect } from "react";
import Layout from "@/components/Layout";

const GamePage: FC = () => {
  const [coins, setCoins] = useState(100);
  const [hearts, setHearts] = useState(3);

  function handleCoinsChangedEvent(coins) {
    setCoins(coins);
  }

  function handleHeartsChangedEvent(hearts) {
    setHearts(hearts);
  }

  useEffect(() => {
    const game = new Game(coins, hearts);

    const coinsChangedObserver = new EventObserver(handleCoinsChangedEvent);
    const heartsChangedObserver = new EventObserver(handleHeartsChangedEvent);

    game.eventSubject.attach("coinsChanged", coinsChangedObserver);
    game.eventSubject.attach("heartsChanged", heartsChangedObserver);

    game.initialize();
    game.initGame();
  }, []);

  return <Layout.Page></Layout.Page>;
};

export default GamePage;
