/************************************************************************************************
 * Objetivo: Responsável pea manipulação de dados de TAREFA no Banco de Dados
 * Autor: Luiz Gustavo e Muryllo Vieira
 * Data: 22/05/2023
 * Versão: 1.0
************************************************************************************************/

/**
    //$queryRawUnsafe( ) -> Permite interpretar uma variavel como sendo um scriptSQL
    //$queryRaw( ) -> Esse executa o comando dentro de aspas e não podendo interpretar uma variavel
*/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instancia da classe PrismaClient
var prisma = new PrismaClient();

//Retorna a lista de todas as tarefas
const mdlSelectAllTarefas = async function () {

    //Script para buscar todos os itens no BD
    let sql = `select tbl_tarefa.nome, tbl_tarefa.tempo_previsto, tbl_tarefa.numero, tbl_tarefa.foto_peca, tbl_tipo_tarefa.nome as nome_tipo_tarefa, tbl_professor.nome as nome_professor, tbl_materia.nome as nome_materia
	from tbl_tarefa
		inner join tbl_tipo_tarefa
			on tbl_tarefa.id_tipo_tarefa = tbl_tipo_tarefa.id
		inner join tbl_professor
			on tbl_tarefa.id_professor = tbl_professor.id
		inner join tbl_materia
			on tbl_tarefa.id_materia = tbl_materia.id;`;

    //$queryRawUnsafe(sql) - permite interpretar uma variavel como sendo um sriptSQL
    //queryRaw('select * from tbl_tarefa') - permite interpretar o scriptSQL direto no metodo
    let rsTarefa = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsTarefa.length > 0) {
        return rsTarefa
    } else {
        return false;
    }
}

//Retorna a Tarefa filtrando pelo ID
const mdlSelectByIdTarefa = async function (id) {

    let idTarefa = id

    //Script para buscar uma Tarefa filtrando pelo ID
    let sql = `select * from tbl_tarefa where id = ${idTarefa}`;

    //console.log(sql);
    let rsTarefa = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsTarefa.length > 0) {
        return rsTarefa
    } else {
        return false;
    }
}

//Retorna a Tarefa filtrando pelo nome
const mdlSelectByNameTarefa = async function (nome) {

    let nameTarefa = nome

    //Script para buscar uma Tarefa filtrando pelo ID
    let sql = `select * from tbl_tarefa where nome like '%${nameTarefa}%'`;

    let rsTarefa = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsTarefa.length > 0) {
        return rsTarefa
    } else {
        return false;
    }
}

//Inserir dados de  tarefa no Banco de dados
const mdlInsertTarefa = async function (dadosTarefa) {
    let sql = `insert into tbl_tarefa(
                                    nome,
                                    tempo_previsto,
                                    numero,
                                    foto_peca,
                                    id_tipo_tarefa,
                                    id_professor,
                                    id_materia
                                ) values (
                                    '${dadosTarefa.nome}',
                                    '${dadosTarefa.tempo_previsto}',
                                    '${dadosTarefa.numero}',
                                    '${dadosTarefa.foto_peca}',
                                    ${dadosTarefa.id_tipo_tarefa},
                                    ${dadosTarefa.id_professor},
                                    ${dadosTarefa.id_materia});`

    //Executa o scriptSQL no banco de dados
    // console.log(sql);
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Atualizar uma Tarefa existente 
const mdlUpdateTarefa = async function (dadosTarefa) {
    let sql = `update tbl_tarefa
    set nome = '${dadosTarefa.nome}',
        tempo_previsto = '${dadosTarefa.tempo_previsto}',
        numero = ${dadosTarefa.numero},
        foto_peca = '${dadosTarefa.foto_peca}',
        id_tipo_tarefa = ${dadosTarefa.id_tipo_tarefa},
        id_professor = ${dadosTarefa.id_professor},
        id_materia = ${dadosTarefa.id_materia}
    where id = ${dadosTarefa.id};
    `
    //Executa o scriptSQL no banco de dados
    // console.log(sql);
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//Retorna o ultimo id inserido no BD
const mdlSelectLastId = async function () {

    let sql = 'select * from tbl_tarefa order by id desc limit 1'

    let rsTarefa = await prisma.$queryRawUnsafe(sql);

    if (rsTarefa.length > 0) {
        return rsTarefa;
    } else {
        return false;
    }
}

//Excluir uma tarefa existente
const mdlDeleteTarefa = async function (id) {

    let sql = `delete from tbl_tarefa where id = ${id}`

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

module.exports = {
    mdlSelectAllTarefas,
    mdlSelectByIdTarefa,
    mdlSelectByNameTarefa,
    mdlSelectLastId,
    mdlInsertTarefa,
    mdlUpdateTarefa,
    mdlDeleteTarefa
}