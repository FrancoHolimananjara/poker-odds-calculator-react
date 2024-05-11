import { CheckCircle, RotateCw } from "lucide-react";
import { calculateEquity } from "poker-odds";
import PropTypes from "prop-types";
import { useState } from "react";
import Card from "./Card";
import Hand from "./Hand";
Body.propTypes = {
  deck: PropTypes.array,
};
export default function Body({ deck }) {
  const [response, setResponse] = useState([]);
  const [theBoard, setTheBoard] = useState([]);
  const [theBoardSlice, setTheBoardSlice] = useState("");
  const [hand, setHand] = useState("");
  const [allCardChoosen, setAllCardChoosen] = useState([]);
  const [isDeckRest, setIsDeckRest] = useState(false);
  const [isEnableToCalculate, setIsEnableToCalculate] = useState(false);

  const [realHand, setRealHand] = useState([]);

  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  const handleChangeHand = (e) => {
    setHand(e.target.value);
  };

  const handleSetBoard = (e) => {
    console.log(theBoard.length, isEnableToCalculate);
    if (theBoard.length < 5) {
      setTheBoardSlice(e.target.value);
    } else {
      setTheBoardSlice("");
    }
  };

  // Fonction pour séparer une chaîne de caractères de carte en deux cartes
  function separerCartes(str) {
    return [str.slice(0, 2), str.slice(2)];
  }

  // Fonction pour séparer une chaîne de caractères de carte en deux cartes
  function separerCartesHandLikeBoard(str) {
    const cartes = [];
    for (let i = 0; i < str.length; i += 2) {
      cartes.push(str.slice(i, i + 2));
    }
    return cartes;
  }

  const handleClickSetBoard = () => {
    setTheBoard(theBoardSlice.split(",").flatMap(separerCartesHandLikeBoard));
  };

  const handleClickSetHand = () => {
    const fh = hand.split(",");
    theBoard.map((b) => removeItemOnce(deck, b));
    setAllCardChoosen(fh.flatMap(separerCartesHandLikeBoard));
    allCardChoosen.map((b) => removeItemOnce(deck, b));
    if (realHand.length == fh.map(separerCartes).length) {
      setIsEnableToCalculate(false);
    } else {
      setIsEnableToCalculate(true);
      setRealHand(fh.map(separerCartes));
    }
  };

  const handleCalculate = () => {
    const fmap = realHand.flatMap((c) => c);
    fmap.map((h) => removeItemOnce(deck, h));
    const hands = realHand;
    const board = theBoard;

    const iterations = 100000; // optional
    const exhaustive = false; // optional

    const res = calculateEquity(hands, board, iterations, exhaustive);
    res.forEach((r) => setResponse((prev) => [...prev, r]));
    setIsEnableToCalculate(false);
  };

  const handleUpdate = () => {
    theBoard.map((b) => removeItemOnce(deck, b));
    setResponse([]);
    handleCalculate();
  };

  const getCardPercentage = (count, handChanceCount) => {
    if (count > 100) {
      return handChanceCount / 10;
    } else if (count > 2) {
      return ((handChanceCount / count) * 100).toFixed(2);
    } else if (handChanceCount == 1) {
      if (theBoard.length < 5) {
        return ((handChanceCount / count) * 100).toFixed(2);
      } else {
        return handChanceCount * 100;
      }
    }
  };

  const getWinPercentage = (count, win) => {
    if (count > 100) {
      return win / 10;
    } else {
      if (theBoard.length < 5) {
        return ((win / count) * 100).toFixed(2);
      } else {
        return win * 100;
      }
    }
  };
  return (
    <div className="mt-10 max-lg:pl-5 pr-5">
      <div className="xl:flex gap-5">
        <div id="sidebar">
          <div className="flex gap-2 items-center">
            <div>
              <h1 className="font-bold">Board :</h1>
              <input
                type="text"
                className="p-2 rounded-md mt-1 w-[250px] bg-slate-200 dark:bg-gray-900"
                value={theBoardSlice}
                placeholder="ex 3c,6s,7s"
                onChange={handleSetBoard}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => handleClickSetBoard(e)}
            className="bg-purple-700 dark:bg-gray-800 text-gray-100  p-2 rounded-md mt-2 mb-5"
          >
            Set Board
          </button>
          <ul className="flex gap-2 mt-1">
            {theBoard.length != 0 &&
              theBoard?.map((d, key) => {
                return (
                  <li
                    key={key}
                    onClick={() =>
                      setTheBoard((prev) => [...removeItemOnce(prev, d)])
                    }
                  >
                    <Card rank={d[0]} suit={d[1]} />
                  </li>
                );
              })}
          </ul>
          <div className="mt-5">
            <h1 className="font-bold">Hand :</h1>
            <input
              type="text"
              className="p-2 rounded-md mt-1 w-[250px] bg-slate-200 dark:bg-gray-900"
              value={hand}
              placeholder="ex 3sAs,6h7h"
              onChange={handleChangeHand}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={(e) => handleClickSetHand(e)}
              className="bg-purple-700 dark:bg-gray-800 text-gray-100 p-2 rounded-md mt-2 mb-5"
            >
              Set Hand
            </button>
            {realHand.length != 0 && theBoard.length != 0 ? (
              <button
                type="button"
                onClick={(e) =>
                  isEnableToCalculate ? handleCalculate(e) : handleUpdate(e)
                }
                className="bg-purple-700 dark:bg-gray-800 text-gray-100 p-2 rounded-md mt-2 mb-5"
              >
                {isEnableToCalculate ? "Calculate" : <RotateCw />}
              </button>
            ) : null}
          </div>
        </div>
        {/* DECK REST */}
        <div className="lg:w-full">
          <div className="flex gap-1 items-center">
            <input
              type="checkbox"
              name="show"
              onChange={(e) => setIsDeckRest(e.target.checked)}
            />
            <p className="font-normal text-gray-400">
              Show the rest of the deck ?
            </p>
          </div>
          {isDeckRest && (
            <ul className="flex flex-wrap gap-1 mt-2 items-center justify-center">
              {deck.map((d, key) => {
                return (
                  <li
                    key={key}
                    onClick={() =>
                      theBoard.length < 5 &&
                      theBoard.length != 0 &&
                      setTheBoard((prev) => [...prev, d])
                    }
                  >
                    <Card rank={d[0]} suit={d[1]} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="sm:flex flex-wrap max-lg:justify-center items-center rounded-lg gap-10 lg:gap-5">
        {response.map((r, key) => {
          return (
            <div
              className="rounded-lg bg-gray-100 dark:bg-slate-900  md:w-[330px] lg:w-[420px] pt-5  pl-5 pr-5 pb-10 mt-5"
              key={key}
            >
              <div className="flex items-center gap-2 justify-between">
                <Hand hand={r.hand} />
                {getWinPercentage(r.count, r.wins) == 100 && (
                  <CheckCircle className="text-green-700" />
                )}
              </div>

              <div className="mt-2">
                <p className="font-medium text-lg">
                  Wins :{" "}
                  <span
                    style={{
                      color:
                        getWinPercentage(r.count, r.wins) > 80
                          ? "green"
                          : getWinPercentage(r.count, r.wins) > 50
                          ? "purple"
                          : getWinPercentage(r.count, r.wins) > 10
                          ? "orange"
                          : "red",
                    }}
                  >
                    {getWinPercentage(r.count, r.wins)} %
                  </span>
                </p>
                <p className="font-medium text-lg">Ties : {r.ties}</p>
              </div>
              <div className="mt-2 max-md:pl-5 lg:flex lg:w-[380px] dark:text-gray-400 lg:flex-wrap">
                {r.handChances.map((hc, key) => (
                  <div key={key} className="flex gap-1 w-[190px]">
                    <p className="text-sm">{hc.name} : </p>
                    <p
                      className="text-sm"
                      style={{
                        color:
                          getCardPercentage(r.count, hc.count) > 80
                            ? "green"
                            : getCardPercentage(r.count, hc.count) > 50
                            ? "purple"
                            : getCardPercentage(r.count, hc.count) > 10
                            ? "orange"
                            : "red",
                      }}
                    >
                      {getCardPercentage(r.count, hc.count) != null
                        ? getCardPercentage(r.count, hc.count)
                        : 0}{" "}
                      %
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
