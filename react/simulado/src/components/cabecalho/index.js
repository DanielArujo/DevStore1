import { Container } from "../cabecalho/styled";


export default function Index(){
    return(
        <Container>
            <div class="box-cabecalho">
                <div class="box-user-information">
                    <div class="user-image"> <img src="../react/simulado/public/assets/images/brunin-god.svg" alt="" > <div class="notification"> 3 </div> </img> </div>
                    <div class="user-name">Ola, <b> Bruno de Oliveira </b></div>
                </div>
                <div class="box-images">
                    <div class="recarregar"> <button> <img src="../react/simulado/public/assets/images/reload.svg" alt="" /> </button> </div>
                    <div class="sair"> <button> <img src="../react/simulado/public/assets/images/log-out.svg" alt="" /> </button> </div>
                </div>
            </div>
            <div class="line"></div>
        </Container>
    )
}