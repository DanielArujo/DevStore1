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
        let r = await db.tb_matricula.create(
            {
                nm_aluno: matri.aluno,
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

        let r = await db.tb_matricula.update({
            nm_aluno: campos.aluno,
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

