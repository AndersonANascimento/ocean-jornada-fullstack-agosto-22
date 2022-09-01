import { useState } from 'react';
import HighScore from '../HighScore/HighScore';
import Jogo from '../Jogo/Jogo';
import './App.css';

function App() {

  const [gameOver, setGameOver] = useState(false);
  const [pontos, setPontos] = useState(0);

  function onMorrer(pontosAoMorrer) {
    // console.log("App -> onMorrer");
    setGameOver(true);
  }
  
  function onPontos(novoPonto) {
    setPontos(novoPonto);
  }

  return (
    <div className="App">
      <Jogo onMorrer={onMorrer} onPontos={onPontos} />
      {gameOver && <HighScore pontos={pontos} />}
    </div>
  );
}

export default App;
