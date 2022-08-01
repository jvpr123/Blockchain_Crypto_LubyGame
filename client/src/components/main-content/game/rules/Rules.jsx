import React from "react";

const Rules = () => {
  return (
    <div>
      <div>
        <h3>
          Wanna play? Follow this instructions and pay attention to the rules:
        </h3>
      </div>

      <div>
        <h4>
          <ol className="mt-4 ms-4">
            <li className="mt-3">
              Click the Start Game button to bet 4 LBC and increase you game
              balance to start playing.
            </li>
            <li className="mt-3">
              Once started, you can't give up of playing, otherwise you will
              lose the coins you bet.
            </li>
            <li className="mt-3">
              You'll have 10 seconds to submit your answer. After this time, the
              question will be marked as wrong.
            </li>
            <li className="mt-3">
              Right answers worth +1 LBC and wrong answers -1 LBC.
            </li>
          </ol>
        </h4>
      </div>
    </div>
  );
};

export default Rules;
