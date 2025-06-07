import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const sourceCard = [
  {"src": '/img/helmet-1.png', matched: false},
  {"src": '/img/potion-1.png', matched: false},
  {"src": '/img/ring-1.png', matched: false},
  {"src": '/img/scroll-1.png', matched: false},
  {"src": '/img/shield-1.png', matched: false},
  {"src": '/img/sword-1.png', matched: false}
]


function App() {
  const [ cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = ()=>{
    const shuffledCards = [...sourceCard, ...sourceCard]
      .sort(()=>(Math.random()-0.5))
      .map((card)=>({...card, id: Math.random()}))

    setCards(shuffledCards);
    setTurns(0);
  }

  const handleChoice = (card)=>{
      choiceOne ? setChoiceTwo(card):setChoiceOne(card);
  }

  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
        setCards(p => {
          return p.map(card=>{
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }else{
              return card;
            }
          })
        })
        reset();
      }else{
        setTimeout(()=>reset(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  const reset = ()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(t => t+1);
    setDisabled(false);
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick = {shuffleCards} >New Game</button>

      <div className='card-grid'>
        {
          cards.map((card)=>(
            <SingleCard 
              key={card.id} 
              card={card}
              handleChoice = {handleChoice}
              flipped = { choiceOne===card || choiceTwo===card || card.matched}
              disabled={disabled}
            />
          ))
        }
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;

