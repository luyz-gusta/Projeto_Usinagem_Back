/************************************************************************************************
 * Objetivo: Responsável pea manipulação de dados dos ALUNOS no Banco de Dados
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

//Inserir dados do aluno no Banco de dados
const insertAluno = async function (dadosAluno) {
    let sql = ''

    if (dadosAluno.data_nascimento == null) {
        //ScriptSQL para inserir dados
        sql = `insert into tbl_aluno (
                                nome,
                                matricula,
                                cpf,
                                data_nascimento,
                                email, 
                                id_usuario,
                                id_turma 
                            ) values (
                                '${dadosAluno.nome}',
                                '${dadosAluno.matricula}',
                                '${dadosAluno.cpf}',
                                ${dadosAluno.data_nascimento},
                                '${dadosAluno.email}',
                                '${dadosAluno.id_usuario}',
                                '${dadosAluno.id_turma}'
                            )`;
    } else {
        //ScriptSQL para inserir dados
        sql = `insert into tbl_aluno (
        nome,
        matricula,
        cpf,
        data_nascimento,
        email, 
        id_usuario,
        id_turma 
    ) values (
        '${dadosAluno.nome}',
        '${dadosAluno.matricula}',
        '${dadosAluno.cpf}',
        '${dadosAluno.data_nascimento}',
        '${dadosAluno.email}',
        '${dadosAluno.id_usuario}',
        '${dadosAluno.id_turma}'
    )`;

    }
    //Executa o scriptSQL no banco de dados
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Atualizar um aluno existente 
const updateAluno = async function (dadosAluno) {

    let sql = '';

    if(dadosAluno.data_nascimento == null) {
        sql = `update tbl_aluno set 
                        nome = '${dadosAluno.nome}',
                        matricula = '${dadosAluno.matricula}',
                        cpf = '${dadosAluno.cpf}',
                        data_nascimento = ${dadosAluno.data_nascimento},
                        email = '${dadosAluno.email}',
                        id_usuario = '${dadosAluno.id_usuario}',
                        id_turma = '${dadosAluno.id_turma}'
                where id = ${dadosAluno.id}`;
    } else {
        sql = `update tbl_aluno set 
                        nome = '${dadosAluno.nome}',
                        matricula = '${dadosAluno.matricula}',
                        cpf = '${dadosAluno.cpf}',
                        data_nascimento = '${dadosAluno.data_nascimento}',
                        email = '${dadosAluno.email}',
                        id_usuario = '${dadosAluno.id_usuario}',
                        id_turma = '${dadosAluno.id_turma}'
                where id = ${dadosAluno.id}`;
    }
     

    //Executa o scriptSQL no banco de dados
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Excluir um aluno existente
const deleteAluno = async function (id) {

    let idAluno = id;

    let sql = `delete from tbl_aluno where id = ${idAluno};`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Retorna a lista de todos os alunos
const selectAllAlunos = async function () {

    //Script para buscar todos os itens no BD
    let sql = 'select * from tbl_aluno';

    //$queryRawUnsafe(sql) - permite interpretar uma variavel como sendo um sriptSQL
    //queryRaw('select * from tbl_aluno') - permite interpretar o scriptSQL direto no metodo
    let rsAluno = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false;
    }
}

//Retorna o aluno filtrando pelo ID
const selectByIdAluno = async function (id) {

    let idAluno = id

    //Script para buscar um aluno filtrando pelo ID
    let sql = `select * from tbl_aluno where id = ${idAluno}`;

    //console.log(sql);
    let rsAluno = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false;
    }
}

//Retorna o aluno filtrando pelo nome
const selectByNameAluno = async function (nome) {

    let nameAluno = nome

    //Script para buscar um aluno filtrando pelo ID
    let sql = `select * from tbl_aluno where nome like '%${nameAluno}%'`;

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false;
    }
}

//Retorna o ultimo id inserido no BD
const selectLastId = async function () {

    let sql = 'select * from tbl_aluno order by id desc limit 1'

    let rsAluno = await prisma.$queryRawUnsafe(sql);

    if (rsAluno.length > 0) {
        return rsAluno;
    } else {
        return false;
    }
}

module.exports = {
    selectAllAlunos,
    selectByIdAluno,
    selectByNameAluno,
    insertAluno,
    updateAluno,
    deleteAluno,
    selectLastId
}