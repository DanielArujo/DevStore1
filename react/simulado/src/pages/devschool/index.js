import "bootstrap/dist/css/bootstrap.min.css";
import popups from "bootstrap-popups";

import LoadingBar from 'react-top-loading-bar'
import {React, useRef }from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'

import { Container, Conteudo } from './styled'

import { useState, useEffect } from 'react';

import Api from '../../service/api';



const api = new Api();

export default function Index() {

    const[alunos, setAlunos] = useState([])
    const[nome, setNome] = useState('');
    const[chamada, setChamada] = useState('');
    const[curso, setCurso] = useState('');
    const[turma, setTurma] = useState('');
    const[idAlterando, setIdAlerando] = useState(0);

    const loading = useRef(null)  

    async function listar() {
        let r = await api.listar();
        console.log(r);
        setAlunos(r);  
    }

    async function inserir(){
        
        if(idAlterando === 0){
        loading.current.continuousStart();
        let r = await api.inserir(nome, chamada, curso, turma);
            if(r.erro)
                toast.error(r.erro)
            else{
                toast.dark('Aluno inserido!!!');
                limparCampos();
            }
            loading.current.complete();
        } else {
        loading.current.continuousStart();
        let r = await api.alterar(idAlterando, nome, chamada, curso, turma)
            if(r.erro)
                toast.dark(r.erro)
            else {
                toast.dark('Aluno alterado!!!') 
                limparCampos(); 
            }
        loading.current.complete();
        }

        listar();
    }

    function limparCampos(){
        setNome('');
        setChamada('');
        setCurso('');
        setTurma('');
        setIdAlerando(0)
    }


    async function deletar(id){
        let r = await api.deletar(id);
        toast.dark('Aluno deletado');
        listar();
    }

    async function alterar(item){
        setNome(item.nm_aluno);
        setChamada(item.nr_chamada);
        setCurso(item.nm_curso);
        setTurma(item.nm_turma);
        setIdAlerando(item.id_matricula)
    }

    useEffect( () => { listar() }, [] )

    return (
        <Container>
            <ToastContainer />
            <LoadingBar color='#4607ac' ref={loading} />
            <Menu />
            <Conteudo>
                <Cabecalho />
                <div className="box-principal">
                    <div className="box-body">
                        <div className="box-organization-body">
                            <div className="box-alunos-adm">
                                <div className="barra"></div>
                                <div className="aluno-novo"> {idAlterando === 0 ? 'Novo Aluno' : "Alterando registro " + idAlterando } </div>
                            </div>

                            <div className="inputs-cadastro">
                                <div className="inputs-esquerda">
                                    <div className="format-inputs">
                                        <div className="aluno-nome">Nome: </div>
                                        <div className="input"> <input type="text" value={nome} onChange={e => setNome(e.target.value)} /> </div>
                                    </div>
                                    <div className="format-inputs">
                                        <div className="aluno-chamada"> Chamada: </div>
                                        <div className="input"><input type="text" value={chamada} onChange={e => setChamada(e.target.value)} /> </div>
                                    </div>
                                </div>

                                <div className="inputs-direita">
                                    <div className="format-inputs">
                                        <div className="aluno-chamada">Turma: </div>
                                        <div className="input"><input type="text" value={turma} onChange={e => setTurma(e.target.value)} /> </div>
                                    </div>
                                    <div className="format-inputs">
                                        <div className="aluno-turma">Curso: </div>
                                        <div className="input"> <input type="text" value={curso} onChange={e => setCurso(e.target.value)} /> </div>
                                    </div> 
                                </div>
                                <div className="botao-cadastrar"><button onClick={inserir}> {idAlterando === 0 ? 'Cadastrar' : 'Alterar' }  </button> </div>
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
                                        <th className="buttom-option"></th>
                                        <th className="buttom-option"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {alunos.map((item, i) => 
                                        <tr className= { i % 2 === 0 ? "" : "linha-alternada"}>
                                            <td> {item.id_matricula} </td>
                                            <td title={item.nm_aluno }>
                                                {item.nm_aluno != null && item.nm_aluno.length >= 30 ? item.nm_aluno.substr(0, 30) + '...' : item.nm_aluno } 
                                            </td>
                                            <td> {item.nr_chamada} </td>
                                            <td> {item.nm_turma} </td>
                                            <td> {item.nm_curso} </td>
                                            <td className="buttom-option"> <button onClick={() => alterar(item)}> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                            <td className="buttom-option"> <button onClick={ () => { popups.confirm({ message: "Tem certeza que deseja excluir o aluno " + item.id_matricula + "?" , task: () => deletar(item.id_matricula) }) }  }> <img src="/assets/images/trash.svg" alt="" /> </button> </td>                              
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