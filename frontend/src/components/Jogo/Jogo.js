import './Jogo.css';
import nuvens from "../../assets/clouds.png";
import mario from "../../assets/mario.gif";
import cano from "../../assets/pipe.png";

function Jogo() {
    return <div className="jogo">
        <img className="nuvens" src={nuvens} alt="Nuvens" />
        <img className="mario" src={mario} alt="Mario" />
        <img className="cano" src={cano} alt="Cano" />
        <div className="chao" />
    </div>;
}

export default Jogo;
