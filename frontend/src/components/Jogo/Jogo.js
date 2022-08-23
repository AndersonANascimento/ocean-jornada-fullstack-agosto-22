import './Jogo.css';
import nuvens from "../../assets/clouds.png";
import mario from "../../assets/mario.gif";
import cano from "../../assets/pipe.png";
import React, { useRef, useState } from "react";

function Jogo() {
    console.log("Componente de Jogo Renderizado");

    // usamos o useState dentro do componente mas 
    // precisa ser importado do React
    const [estaPulando, setEstaPulando] = useState(false);

    // Criamos as referências para mario e cano
    const marioRef = useRef();
    const canoRef = useRef();

    function marioEstaNoCano() {
        // Acessando as referências para mario e cano
        const mario = marioRef.current;
        const cano = canoRef.current;
        // Verifica se referências estão ok
        if (!mario||!cano) {
            return;
        }
        // Retorna o valor da lógica que determinar se o mário
        // está na mesma posição do cano ou não (com as checagens
        // que consideram toda a área do cano)
        return (
            cano.offsetLeft > mario.offsetLeft &&
            cano.offsetLeft < mario.offsetLeft + mario.offsetWidth &&
            mario.offsetTop + mario.offsetHeight > cano.offsetTop
        );
    }

    setInterval (function () {
        const valor = marioEstaNoCano();
        console.log("Mario está no cano?", valor);
    }, 100);

    document.onkeydown = function () {
        // Atualizamos o estado para true
        setEstaPulando(true);
        // 700 ms = 0.7s
        setTimeout(function () {
            // Voltamos o estado para o valor inicial
            setEstaPulando(false);
        }, 700);
    };

    // Define a classe a ser utilizada    
    let marioClassName = (estaPulando) ? "mario mario-pulo" : "mario"; 

    console.log(15, { estaPulando});

    return <div className="jogo">
        <img className="nuvens" src={nuvens} alt="Nuvens" />
        <img ref={canoRef} className="cano" src={cano} alt="Cano" />
        <img ref={marioRef} className={marioClassName} src={mario} alt="Mario" />
        <div className="chao" />
    </div>;
}

export default Jogo;
