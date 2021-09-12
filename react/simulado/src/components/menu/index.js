import { Container } from "./styled"

export default function Index(){
    return(
        <Container>
             <header>
                <div className="book-svg"> <img src="../react/simulado/public/assets/images/book.svg" alt="" /> </div>
                <div className="nome-site"><span>Dev</span>School</div>
            </header>
    
            <div className="ret-cinza"></div>
            <div className="box-opcoes"> 
                <div>Gerenciamento</div>
                <div> <button> <img src="../react/simulado/public/assets/images/seta-baixo.svg" alt="" /> </button> </div>
            </div>
            <div className="box-aluno">  Alunos</div>
        </Container>
    )
}