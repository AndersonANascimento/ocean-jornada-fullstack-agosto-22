import './Jogo.css';
import nuvens from "../../assets/clouds.png";
import mario from "../../assets/mario.gif";
import gameOver from "../../assets/game-over.png";
import cano from "../../assets/pipe.png";
import React, { useEffect, useRef, useState } from "react";

function Jogo(props) {
    console.log("Componente de Jogo Renderizado");

    // usamos o useState dentro do componente mas 
    // precisa ser importado do React
    const [estaPulando, setEstaPulando] = useState(false);
    const [estaMorto, setEstaMorto] = useState(false);
    const [pontos, setPontos] = useState(0);

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
    
    // useEffect
    useEffect(
        // Effect
        function () {
            const interval = setInterval (function () {
                // Verificamos se mario está no cano
                const estaNoCano = marioEstaNoCano();
                // Se não está no cano, encerramos a função
                if (!estaNoCano || estaMorto) {
                    return;
                }
                // Caso esteja no cano, atualizamos o estado 'estaMorto' para 'true'
                setEstaMorto(true);
                props.onMorrer();
            }, 100);

            return () => clearInterval(interval);
            // console.log({ estaMorto});        
        }, 
        // Lista de dependências
        [estaMorto]
    );

    // useEffect
    useEffect(
        function () {
            // Salvar a pontuação
            const interval = setInterval (function () {
                if (estaMorto) {
                    return;
                }
        
                setPontos(pontos + 1);
        
                console.log({ pontos });
            }, 500);

            return () => clearInterval(interval);
        }, 
        [estaMorto, pontos]
    );

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
    const marioImage = estaMorto ? gameOver : mario;
    const pararAnimacao = estaMorto ? "parar-animacao" : "";

    return <div className="jogo">
        <div>Pontos: { pontos }</div>
        <img className="nuvens" src={nuvens} alt="Nuvens" />
        <img ref={canoRef} className={"cano " + pararAnimacao} src={cano} alt="Cano" />
        <img ref={marioRef} className={marioClassName} src={marioImage} alt="Mario" />
        <div className="chao" />
    </div>;
}

export default Jogo;
