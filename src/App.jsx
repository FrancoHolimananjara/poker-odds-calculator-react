import Body from "./components/Body";
import DivWrapper from "./components/DivWrapper";
import Header from "./components/Header";

const RANK = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const SUITS = ["d", "h", "s", "c"];
const deck = [];
SUITS.forEach((s) => {
  RANK.forEach((r) => {
    deck.push(r.concat(s));
  });
});

function App() {
  return (
    <>
      <DivWrapper>
        <div className="lg:flex gap-10 items-start">
          <Header />
          <Body deck={deck} />
        </div>
      </DivWrapper>
    </>
  );
}

export default App;
