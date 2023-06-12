/************************************************************************************************
 * Objetivo: Responsável pea manipulação de dados dos TURMA_CURSO_MATERIA_PROF no Banco de Dados
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

const mdlSelectAllProfessores = async () => {
    let sql = `select 
    professor.id, 
    professor.nome, 
    professor.nif,
    professor.telefone, 
    professor.email as email_pessoal, 
    usuario.email as email_usuario, 
    usuario.senha, status.nivel 
    from tbl_professor as professor 
    inner join tbl_usuario as usuario on 
    usuario.id = professor.id_usuario 
    inner join tbl_status_usuario as status on 
    usuario.id_status_usuario = status.id;`

    let rsProfessor = await prisma.$queryRawUnsafe(sql)

    if(rsProfessor.length > 0){
        return rsProfessor
    }else{
        return false
    }
}

module.exports = {
    mdlSelectAllProfessores,
    mdlSelectProfessorByID,
    mdlSelectProfessorByName,
    mdlSelectProfessorByNif,
    mdlSelectLastByID,
    mdlInsertProfessor,
    mdlUpdateProfessor,
    mdlDeleteProfessor
}