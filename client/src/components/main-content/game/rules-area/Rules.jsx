const Rules = () => {
  return (
    <div>
      <div className="mt-4">
        <h1>
          Wanna play? Follow this instructions and pay attention to the rules:
        </h1>
      </div>

      <div>
        <h3>
          <ol className="mt-5 ms-4">
            <li className="mt-4">
              Click the Start Game button to bet 4 LBC and increase you game
              balance to start playing.
            </li>
            <li className="mt-4">
              Once started, you can't give up of playing, otherwise you will
              lose the coins you bet.
            </li>
            <li className="mt-4">
              Right answers worth +1 LBC and wrong answers -1 LBC.
            </li>
            <li className="mt-4">
              If you reach 100% ponctuation you earn an extra LBC!
            </li>
          </ol>
        </h3>
      </div>
    </div>
  );
};

export default Rules;
