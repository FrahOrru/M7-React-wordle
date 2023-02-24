import './board.css';
import Letter  from '../letter/letter';
import { useEffect, useState } from "react";
import useKeypress from "../../useKeypress";

const dailyWord = 'parola';
const guesses = [];
let currentGuess = [];

export default function Board({board, setBoardNewValue}) {
  const [text, setText] = useState("");

  useKeypress((key) => {
    if (key === "Backspace") {
      setText(text.substr(0, text.length - 1));
    } else if(key.match(/[a-z]/i)){

      setText(text + key);
      
      addLetterToBoard(key);
    }
});

  function addLetterToBoard(letter) {
    const tmp = [...board]
    currentGuess.push(letter);
    tmp[guesses.length][currentGuess.length - 1].letter = letter;
  
    if(currentGuess.length === dailyWord.length) {
      console.log('text', text);
      console.log('letter', letter)
      checkGuess(text + letter);
    }

    setBoardNewValue(tmp);
  }

  function checkGuess(guess) {
    guesses.push(guess);
    const tmp = board;
    
    for (var i = 0; i < guess.length; i++) {
      if(dailyWord.toLowerCase().includes(guess[i].toLowerCase())){
        tmp[guesses.length - 1][i].state = 'replaceable';
        
        if(guess[i] === dailyWord[i]) {
          tmp[guesses.length - 1][i].state = 'correct';
        }
      } else {
        tmp[guesses.length - 1][i].state = 'wrong';
      }
   }
   console.log(board)
   setBoardNewValue(tmp);

   checkWin(guess);
  }

  const checkWin = (guess) => {
    if(dailyWord.toLowerCase() === guess.toLowerCase()) {
      setBoardNewValue()
    }
    cleanRow();
  }

  function cleanRow() {
    setText('');
    currentGuess = [];
  }



    return (
      <div className="board">
        {
            board.map((row) => {
                const rowHtml = <div className='row'> { row.map((elem) => {
                        return <Letter letterObj={elem}></Letter>
                    }) 
                }
                </div>
                return rowHtml
            })
        }
      </div>
    );
}