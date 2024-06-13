import "./Categorias.css"
import Tags from "../Tags/Tags"
import ApiReceitasCategorias from "../ApiReceitas/ApiReceitasCategorias";

function Categorias() {
    return (
        <div className="categorias">
            <Tags legenda="Categorias" />
            <ul className="conteudo-categorias">
                <ApiReceitasCategorias />
            </ul>
        </div>
    )
}

export default Categorias;