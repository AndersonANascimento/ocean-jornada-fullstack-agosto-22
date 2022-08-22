import './Jogo.css';
import clouds from "../../assets/clouds.png";
import mario from "../../assets/mario.gif";
import cano from "../../assets/pipe.png";

function Jogo() {
    return <div className="jogo">
        <img className="nuvens" src={clouds} alt="clouds" />
        <img className="mario" src={mario} alt="mario" />
        <img className="cano" src={cano} alt="cano" />
    </div>;
}

export default Jogo;
