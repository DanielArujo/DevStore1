import db from "./db.js";
import express from 'express';
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json())


app.get('/matricula', async (req, resp) => {
    try{
        let r = await db.tb_matricula.findAll({order: [['id_matricula', 'desc']]});

        resp.send(r);

    }catch(e) {
        resp.send(e.toString())
    }
})

app.post('/matricula', async (req, resp) => {
    try{
        let matri = req.body;
        if( isNaN(matri.chamada) || matri.chamada <=0 )
            return resp.send({erro: 'Numero da chamada invalido!'});

        if(matri.nome == '' ||  matri.curso == '' || matri.turma == ''){
            return resp.send({erro: 'Todos os campos devem ser preenchidos!'})
        }
    
       let chamada = await db.tb_matricula.findOne({where : { nr_chamada: matri.chamada} })
       let turma = await db.tb_matricula.findOne({where : { nm_turma: matri.turma} })

       if(chamada != null  && turma != null){
           return resp.send({erro: 'Aluno ja inserido!'})
       }


        let r = await db.tb_matricula.create(
            {
                nm_aluno: matri.nome,
                nr_chamada: matri.chamada,
                nm_curso: matri.curso,
                nm_turma: matri.turma
            })

            resp.send(r);

    }catch(e){
        resp.send(e.toString())
    }
})
app.delete('/matricula/:id', async (req, resp) => {
    try{
        let param = req.params;

        let r = await db.tb_matricula.destroy({where: {id_matricula: param.id}})

        resp.sendStatus(200)

    }catch(e){
        resp.send(e.toString())
    }
})

app.put('/matricula/:id', async (req, resp) => {
    try{
        let id = req.params.id;
        let campos = req.body;

        if( isNaN(campos.chamada) || campos.chamada <=0 )
            return resp.send({erro: 'Numero da chamada invalido'});

        if(campos.nome == '' ||  campos.curso == '' || campos.turma == ''){
            return resp.send({erro: 'Todos os campos devem ser preenchidos!'})
        }
    
        let chamada = await db.tb_matricula.findOne({where : { nr_chamada: campos.chamada} })
        let turma = await db.tb_matricula.findOne({where : { nm_turma: campos.turma} })

        if(chamada != null  && turma != null){
            return resp.send({erro: 'Aluno ja inserido!'})
        }

        let r = await db.tb_matricula.update({
            nm_aluno: campos.nome,
            nr_chamada: campos.chamada,
            nm_curso: campos.curso,
            nm_turma: campos.turma
        },
        {
            where: {
                id_matricula: id
            }
        })

        resp.sendStatus(200)
    }catch(e){
        resp.send(e.toString())
    }
})

app.listen(process.env.PORT,

    x => console.log(`Server up at port ${process.env.PORT}`))

