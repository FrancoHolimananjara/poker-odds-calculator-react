export default function Header() {
  return (
    <div className="bg-gray-800 dark:bg-slate-900 lg:h-screen pl-5 pr-5 pt-10 pb-5 xl:pt-10 xl:pl-10">
      <h1 className="font-bold text-gray-300 max-[350px]:text-[22px] max-md:text-2xl md:text-3xl lg:text-4xl">
        Poker{" "}
        <span className="text-purple-600 rounded-sm p-1">Odds Calculator</span>
      </h1>
      <p className="font-normal mt-3 text-gray-300 dark:text-gray-400 md:w-[450px] ">
        In this simple application, you can{" "}
        <span className="text-purple-500">
          predict the strength of your hand
        </span>{" "}
        relative to your opponents up to the river card.
      </p>
      <div className="mt-7 flex flex-col gap-2 text-gray-400  md:w-[450px]">
        <div className="flex gap-1 items-start">
          <p>😎</p>
          <p>
            Enter flop first{" "}
            <span className="text-purple-600">ex : 3s,Th,Ac</span>
          </p>
        </div>
        <div className="flex gap-1 items-start">
          <p>🧐</p>
          <p>
            Click on the <span className="text-purple-600">Set Board</span>{" "}
            button to save every board change
          </p>
        </div>
        <div className="flex gap-1 items-start">
          <p>🤩</p>
          <p>
            Enter all hands to evaluate{" "}
            <span className="text-purple-600"> ex : KhQd,Tc9c</span>
          </p>
        </div>

        <div className="flex gap-1 items-start">
          <p>🧐</p>
          <p>
            Click on the <span className="text-purple-600">Set Hand</span>{" "}
            button to save every hand change
          </p>
        </div>
        <div className="flex gap-1 items-start">
          <p>🤐</p>
          <p>
            Click on the <span className="text-purple-600">Rotate</span> icon
            button to load every new hand value,percentage relative to the board
            behavior (UPDATE)
          </p>
        </div>
        <div className="flex gap-1 items-start">
          <p>❌</p>
          <p>
            The WINS text might be not normal but do not worry,only make you
            sure to have clicked on the{" "}
            <span className="text-purple-600">Set Board</span> button after
            adding the (RIVER).
          </p>
        </div>
      </div>
      <div className="flex gap-5 mt-5 lg:mt-16 max-md:justify-center">
        <div>
          <p className="text-purple-500">
            ♠ <span className="font-bold">&quot;s&quot;</span>
          </p>
        </div>
        <div>
          <p className="text-green-500">
            ♣ <span className="font-bold">&quot;c&quot;</span>
          </p>
        </div>
        <div>
          <p className="text-red-500">
            ♥ <span className="font-bold">&quot;h&quot;</span>
          </p>
        </div>
        <div>
          <p className="text-red-500">
            ♦ <span className="font-bold">&quot;d&quot;</span>
          </p>
        </div>
      </div>
    </div>
  );
}
