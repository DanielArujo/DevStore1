import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'

import { Container, Conteudo } from './styled'

import { useState, useEffect } from 'react';

import Api from '../../service/api';



const api = new Api();


export default function Index() {

    const[alunos, setAlunos] = useState([])

    async function listar() {
        let r = await api.listar();
        console.log(r);
        setAlunos(r);  
    }

    useEffect( () => { listar(); }, [] )

    return (
        <Container>
            <Menu />
            <Conteudo>
            <Cabecalho />
                <div className="box-principal">
                <div className="box-body">
                    <div className="box-organization-body">
                        <div className="box-alunos-adm">
                            <div className="barra"></div>
                            <div className="aluno-novo">Novo Aluno</div>
                        </div>

                        <div className="inputs-cadastro">
                            <div className="inputs-esquerda">
                                <div className="format-inputs">
                                    <div className="aluno-nome">Nome: </div>
                                    <div className="input"> <input /> </div>
                                </div>
                                <div className="format-inputs">
                                    <div className="aluno-chamada">Chamada: </div>
                                    <div className="input"><input /> </div>
                                </div>
                            </div>

                            <div className="inputs-direita">
                                <div className="format-inputs">
                                    <div className="aluno-turma">Cruso: </div>
                                    <div className="input"> <input /> </div>
                                </div>
                                <div className="format-inputs">
                                    <div className="aluno-chamada">Turma: </div>
                                    <div className="input"><input /> </div>
                                </div>
                            </div>
                            <div className="botao-cadastrar"><button> Cadastrar</button> </div>
                        </div>
                    </div>

                    <div className="box-organization-body">
                        <div className="box-alunos-adm">
                            <div className="barra"></div>
                            <div className="aluno-novo">Alunos Matriculados</div>
                        </div>
                        <table className="tabela-usuarios">
                            <thead>
                                <tr>
                                    <th> ID </th>
                                    <th> Nome </th>
                                    <th> Chamada </th>
                                    <th> Turma </th>
                                    <th> Curso</th>
                                    <th className="options"></th>
                                    <th className="options"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {alunos.map(item => 
                                    <tr>
                                        <td> {item.id_matricula} </td>
                                        <td> {item.nm_aluno} </td>
                                        <td> {item.nr_chamada} </td>
                                        <td> {item.nm_turma} </td>
                                        <td> {item.nm_curso} </td>
                                        <td className="buttom-option"> <button> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                        <td className="buttom-option"> <button> <img src="/assets/images/trash.svg" alt="" /> </button> </td>                              
                                    </tr>
                                )}
                                
                                
                            </tbody>
                        </table>       
                    </div>
                </div>
            </div>
            </Conteudo>
        </Container>
    )
    }