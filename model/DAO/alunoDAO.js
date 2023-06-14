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
                                cpf,
                                data_nascimento,
                                email
                            ) values (
                                '${dadosAluno.nome}',
                                '${dadosAluno.cpf}',
                                ${dadosAluno.data_nascimento},
                                '${dadosAluno.email}'
                            )`;
    } else {
        //ScriptSQL para inserir dados
        sql = `insert into tbl_aluno (
        nome,
        cpf,
        data_nascimento,
        email
    ) values (
        '${dadosAluno.nome}',
        '${dadosAluno.cpf}',
        '${dadosAluno.data_nascimento}',
        '${dadosAluno.email}'
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

    if (dadosAluno.data_nascimento == null) {
        sql = `update tbl_aluno set 
                        nome = '${dadosAluno.nome}',
                        cpf = '${dadosAluno.cpf}',
                        data_nascimento = ${dadosAluno.data_nascimento},
                        email = '${dadosAluno.email}'
                where id = ${dadosAluno.id}`;
    } else {
        sql = `update tbl_aluno set 
                        nome = '${dadosAluno.nome}',
                        cpf = '${dadosAluno.cpf}',
                        data_nascimento = '${dadosAluno.data_nascimento}',
                        email = '${dadosAluno.email}'
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
    let sql = `select tbl_aluno.id,
                tbl_aluno.nome as nome_aluno,
                tbl_aluno.cpf as cpf,
                DATE_FORMAT(tbl_aluno.data_nascimento, '%d/%m/%Y') as data_nascimento,
                tbl_aluno.email as email_aluno,
                tbl_matricula.id as id_matricula,
                tbl_matricula.numero as numero_matricula
            from tbl_aluno
            join tbl_matricula on tbl_aluno.id = tbl_matricula.id_aluno;`;

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
    let sql = `select tbl_aluno.id,
        tbl_aluno.nome as nome_aluno, 
        tbl_aluno.cpf as cpf,
        date_format(tbl_aluno.data_nascimento, '%d/%m/%Y') as data_nascimento,
        tbl_aluno.email as email_aluno
    from tbl_aluno where id = ${idAluno}`;

    //console.log(sql);
    let rsAluno = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false;
    }
}

//Retorna o aluno filtrando pelo ID
const mdlSelectAlunoIdUsuario = async function (idUsuario) {
    //Script para buscar um aluno filtrando pelo ID
    let sql = `select 
	    matricula.id as id_matricula,
        matricula.numero as numero_matricula
    from tbl_matricula as matricula
	    inner join tbl_usuario as usuario
		    on usuario.id = matricula.id_usuario
    where usuario.id = 5;`;

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
    let sql = `select aluno.id,
        aluno.nome as nome_aluno, 
        aluno.cpf as cpf,
        date_format(aluno.data_nascimento, '%d/%m/%Y') as data_nascimento,
        aluno.email as email_aluno 
    from tbl_aluno where nome like '%${nameAluno}%'`;

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false;
    }
}

// Retorna os alunos filtrando pelo ID de Turma
const mdlSelectAlunoByIdTurma = async function (idTurma) {

    let sql = `select aluno.id as id_aluno, 
        aluno.nome as nome_aluno, 
        aluno.email,
        date_format(aluno.data_nascimento, '%d/%m/%Y') as data_nascimento_aluno,
        matricula.id as id_matricula, matricula.numero as numero_matricula, 
        status_matricula.nome as status_matricula
    from tbl_turma_matricula
        inner join tbl_turma as turma
            on turma.id = tbl_turma_matricula.id_turma
        inner join tbl_matricula as matricula 
            on matricula.id = tbl_turma_matricula.id_matricula
        inner join tbl_status_matricula as status_matricula
            on matricula.id_status_matricula = status_matricula.id
        inner join tbl_aluno as aluno 
            on matricula.id_aluno = aluno.id
    where tbl_turma_matricula.id_turma = ${idTurma};`;

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false;
    }
}

//Retorna o ultimo id inserido no BD
const selectLastId = async function () {

    let sql = `SELECT tbl_aluno.*, tbl_matricula.id AS id_matricula
                FROM tbl_aluno
                JOIN tbl_matricula ON tbl_aluno.id = tbl_matricula.id_aluno
                ORDER BY tbl_aluno.id DESC
                LIMIT 1; `

    let rsAluno = await prisma.$queryRawUnsafe(sql);

    if (rsAluno.length > 0) {
        return rsAluno;
    } else {
        return false;
    }
}

//Inserir um aluno de acordo com a tela do front
const mdlInsertDados = async function (dados) {

    let sql = `CALL sp_inserir_dados(
                    ${dados.numero_matricula}, 
                    '${dados.nome_aluno}', 
                    '${dados.data_nascimento}', 
                    '${dados.email_aluno}',
                    '${dados.email_usuario}',
                    '${dados.senha}'
                );`

                //console.log(sql);
    let rsAluno = await prisma.$queryRawUnsafe(sql);

    if (rsAluno) {
        return rsAluno;
    } else {
        return false;
    }
}

//Update um aluno de acordo com a tela do front
const mdlUpdateDados = async function (dados) {

    let sql = `CALL sp_atualizar_dados(
                @id_matricula := ${dados.id_matricula},
                @novo_numero_matricula := ${dados.numero_matricula},
                @novo_nome_aluno := '${dados.nome_aluno}',
                @nova_data_nascimento := '${dados.data_nascimento}',
                @novo_email_aluno := '${dados.email_aluno}',
                @novo_email_usuario := '${dados.email_usuario}',
                @nova_senha := '${dados.senha}'
            );`

    console.log(sql);
    let rsAluno = await prisma.$queryRawUnsafe(sql);

    console.log(rsAluno);
    if (rsAluno) {
        return true;
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
    mdlSelectAlunoByIdTurma,
    selectLastId,
    mdlInsertDados,
    mdlUpdateDados,
    mdlSelectAlunoIdUsuario
}