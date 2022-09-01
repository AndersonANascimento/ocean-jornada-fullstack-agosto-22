import { useEffect, useState } from "react";
import "./HighScore.css";

function HighScore(props) {

    const [itens, setItens] = useState(undefined);
    
    useEffect(
        function () {
            async function carregarPontuacoes() {
                const response = await fetch("http://localhost:3333/pontuacoes"); //.then(console.log);
                const body = await response.json();
        
                // Atualizamos o estado 'itens' com os valores recebidos
                // Ao atualizar o estado, o React renderiza o componente novamente
                setItens(body);
        
            }
            carregarPontuacoes();
        },
        []
    );
        
    console.log(itens);

    const itensEstaoCarregando = itens === undefined;

    async function salvarPontuacao(event) {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;


        console.log({name, pontos: props.pontos});

        const response = await fetch("http://localhost:3333/pontuacoes", {
            method: "POST",
            body: JSON.stringify({nome:name, pontos: props.pontos}),
            headers: {
                "Content-type": "application/json",
            },
        });

    }

    return (
        <div className="HighScore">
            <div>
                Você fez <b>{ props.pontos }</b> pontos!
            </div>

            <div>
                <h1>HighScore</h1>
                { itensEstaoCarregando ? 
                    (<div>Carregando...</div>) :
                    (
                        <div>
                        {itens.map((item, index) => (
                            <div key={`score_${index}`}>{item.nome} - {item.pontos} pontos</div>
                        ))}
                        </div>
                    )
                }
            </div>

            <div>
                <h1>Registre sua pontuação</h1>
                <form onSubmit={salvarPontuacao}>
                    <input type="text" name="name" placeholder="Digite o seu nome..." />
                    <input type="submit" value="Enviar" />
                </form>
            </div>
        </div>
    );
}

export default HighScore;