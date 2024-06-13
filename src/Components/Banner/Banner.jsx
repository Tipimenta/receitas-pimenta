import "./Banner.css"
import lamb from "../../assets/img/lamb.png";

function Banner(){
    return (
        <div className="banner">
            <h2>Receita do Dia</h2>
            <img src={lamb} alt="foto-receita-dia" />
            </div>
    )

}

export default Banner;