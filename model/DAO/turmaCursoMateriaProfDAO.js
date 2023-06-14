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

const mdlSelectAllTurmaCursoMateriaProf = async () => {
    let sql = `select tbl_turma_curso_materia_professor.id,
	turma.id as id_turma, turma.nome as nome_turma, 
    turma.semestre as semestre_turma, 
    turma.data_inicio as data_inicio_turma, 
    turma.descricao as descricao_turma, 
    date_format(turma.data_conclusao, '%m/%Y') as conclusao_turma, 
	curso.nome as nome_curso, 
    curso.sigla as sigla_curso, 
    curso.descricao as descricao_curso,
    curso.carga_horaria as carga_horaria_curso,
    materia.id as id_materia, 
    materia.nome as nome_materia, 
    materia.sigla as sigla_materia, 
    materia.carga_horaria as carga_horaria_materia,
    materia.descricao as descricao_materia,
    professor.nome as nome_professor, 
    professor.telefone as telefone_professor
        from tbl_turma_curso_materia_professor
	inner join tbl_turma as turma
		on turma.id = tbl_turma_curso_materia_professor.id_turma
	inner join tbl_professor as professor 
		on professor.id = tbl_turma_curso_materia_professor.id_professor
	inner join tbl_curso_materia 
		on tbl_curso_materia.id = tbl_turma_curso_materia_professor.id_curso_materia
	inner join tbl_curso as curso 
		on tbl_curso_materia.id_curso = curso.id
	inner join tbl_materia as materia
		on tbl_curso_materia.id_materia = materia.id;`

    let rsTurmaCursoMateriaProf = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaCursoMateriaProf.length > 0) {
        return rsTurmaCursoMateriaProf
    } else {
        return false
    }
}

const mdlSelectAllTurmaCursoMateriaProfByID = async (id) => {
    let sql = `select tbl_turma_curso_materia_professor.id,
	turma.id as id_turma, turma.nome as nome_turma, 
    turma.semestre as semestre_turma, 
    turma.data_inicio as data_inicio_turma, 
    turma.descricao as descricao_turma, 
    date_format(turma.data_conclusao, '%m/%Y') as conclusao_turma, 
	curso.nome as nome_curso, 
    curso.sigla as sigla_curso, 
    curso.descricao as descricao_curso,
    curso.carga_horaria as carga_horaria_curso,
    materia.id as id_materia, 
    materia.nome as nome_materia, 
    materia.sigla as sigla_materia, 
    materia.carga_horaria as carga_horaria_materia,
    materia.descricao as descricao_materia,
    professor.nome as nome_professor, 
    professor.telefone as telefone_professor
        from tbl_turma_curso_materia_professor
	inner join tbl_turma as turma
		on turma.id = tbl_turma_curso_materia_professor.id_turma
	inner join tbl_professor as professor 
		on professor.id = tbl_turma_curso_materia_professor.id_professor
	inner join tbl_curso_materia 
		on tbl_curso_materia.id = tbl_turma_curso_materia_professor.id_curso_materia
	inner join tbl_curso as curso 
		on tbl_curso_materia.id_curso = curso.id
	inner join tbl_materia as materia
		on tbl_curso_materia.id_materia = materia.id
    where tbl_turma_curso_materia_professor.id = ${id};`

    let rsTurmaCursoMateriaProf = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaCursoMateriaProf.length > 0) {
        return rsTurmaCursoMateriaProf
    } else {
        return false
    }
}

const mdlSelectTurmaCursoMateriaProfByIdProfessor = async (idProfessor) => {
    let sql = `select tbl_turma_curso_materia_professor.id,
        curso.id as id_curso, curso.nome as nome_curso, curso.sigla as sigla_curso, curso.descricao as descricao_curso, curso.carga_horaria as carga_horaria_curso,
        curso.foto as foto_curso,
        professor.id as id_professor, professor.nome as nome_professor, professor.telefone as telefone_professor
    from tbl_turma_curso_materia_professor
	    inner join tbl_turma as turma
		    on turma.id = tbl_turma_curso_materia_professor.id_turma
	    inner join tbl_professor as professor 
		    on professor.id = tbl_turma_curso_materia_professor.id_professor
	    inner join tbl_curso_materia 
		    on tbl_curso_materia.id = tbl_turma_curso_materia_professor.id_curso_materia
	    inner join tbl_curso as curso 
		    on tbl_curso_materia.id_curso = curso.id
	    inner join tbl_materia as materia
		    on tbl_curso_materia.id_materia = materia.id
	where professor.id = ${idProfessor};`

    let rsTurmaCursoMateriaProf = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaCursoMateriaProf.length > 0) {
        return rsTurmaCursoMateriaProf
    } else {
        return false
    }
}

const mdlSelectTurmaCursoMateriaProfByIdProfessorAndIdCurso = async (idProfessor, idCurso) => {
    let sql = `select tbl_turma_curso_materia_professor.id,
	    turma.id as id_turma, turma.nome as nome_turma, turma.semestre as semestre_turma, turma.data_inicio as data_inicio_turma, turma.descricao as descricao_turma,
        date_format(turma.data_conclusao, '%m/%Y') as conclusao_turma
    from tbl_turma_curso_materia_professor
	    inner join tbl_turma as turma
		    on turma.id = tbl_turma_curso_materia_professor.id_turma
	    inner join tbl_professor as professor 
		    on professor.id = tbl_turma_curso_materia_professor.id_professor
	    inner join tbl_curso_materia 
		    on tbl_curso_materia.id = tbl_turma_curso_materia_professor.id_curso_materia
	    inner join tbl_curso as curso 
		    on tbl_curso_materia.id_curso = curso.id
	    inner join tbl_materia as materia
		    on tbl_curso_materia.id_materia = materia.id
	where professor.id = ${idProfessor} and turma.id_curso = ${idCurso};`

    let rsTurmaCursoMateriaProf = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaCursoMateriaProf.length > 0) {
        return rsTurmaCursoMateriaProf
    } else {
        return false
    }
}

const mdlSelectTurmaCursoMateriaProfByIdProfessorAndIdTurma = async (idProfessor, idTurma) => {
    let sql = `select tbl_turma_curso_materia_professor.id,
	    materia.id as id_materia, materia.nome as nome_materia, materia.sigla as sigla_materia, 
        materia.carga_horaria as carga_horaria_materia, materia.descricao as descricao_materia
    from tbl_turma_curso_materia_professor
	    inner join tbl_turma as turma
		    on turma.id = tbl_turma_curso_materia_professor.id_turma
	    inner join tbl_professor as professor 
		    on professor.id = tbl_turma_curso_materia_professor.id_professor
	    inner join tbl_curso_materia 
		    on tbl_curso_materia.id = tbl_turma_curso_materia_professor.id_curso_materia
	    inner join tbl_curso as curso 
		    on tbl_curso_materia.id_curso = curso.id
	    inner join tbl_materia as materia
		    on tbl_curso_materia.id_materia = materia.id
    where professor.id = ${idProfessor} and turma.id = ${idTurma} and turma.id_curso = tbl_curso_materia.id_curso = turma.id_curso;`

    let rsTurmaCursoMateriaProf = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaCursoMateriaProf.length > 0) {
        return rsTurmaCursoMateriaProf
    } else {
        return false
    }
}

const mdlSelectMateriasByIdMatricula = async (idMatricula) => {
    let sql = `
    select
	    materia.id as id_materia, materia.nome as nome_materia, materia.sigla as sigla_materia, 
        materia.carga_horaria as carga_horaria_materia, materia.descricao as descricao_materia
    from tbl_turma_curso_materia_professor
	    inner join tbl_turma as turma
		    on turma.id = tbl_turma_curso_materia_professor.id_turma
	    inner join tbl_professor as professor 
		    on professor.id = tbl_turma_curso_materia_professor.id_professor
	    inner join tbl_curso_materia 
		    on tbl_curso_materia.id = tbl_turma_curso_materia_professor.id_curso_materia
	    inner join tbl_curso as curso 
		    on tbl_curso_materia.id_curso = curso.id
	    inner join tbl_materia as materia
		    on tbl_curso_materia.id_materia = materia.id
	    inner join tbl_turma_matricula as turma_matricula
		    on turma_matricula.id_turma = tbl_turma_curso_materia_professor.id_turma
	    inner join tbl_matricula as matricula
		    on matricula.id = turma_matricula.id_matricula
	where matricula.id = ${idMatricula};
    `
    let rsTurmaCursoMateriaProf = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaCursoMateriaProf.length > 0) {
        return rsTurmaCursoMateriaProf
    } else {
        return false
    }
}

const mdlInsertTurmaCursoMateriaProf = async (dados) => {
    let sql = `insert into tbl_turma_curso_materia_professor(
        id_turma, 
        id_curso_materia, 
        id_professor
        ) values (
            ${dados.id_turma}, 
            ${dados.id_curso_materia}, 
            ${dados.id_professor}
        );
    `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

const mdlSelectLastByID = async () => {
    let sql = `select tbl_turma_curso_materia_professor.id,
        turma.id as id_turma, turma.nome as nome_turma,
        curso.id as id_curso, curso.nome as nome_curso,
        materia.id as id_materia, materia.nome as nome_materia,
        professor.id as id_professor, professor.nome as nome_professor
    from tbl_turma_curso_materia_professor
        inner join tbl_turma as turma
            on turma.id = tbl_turma_curso_materia_professor.id_turma
        inner join tbl_professor as professor 
            on professor.id = tbl_turma_curso_materia_professor.id_professor
        inner join tbl_curso_materia 
            on tbl_curso_materia.id = tbl_turma_curso_materia_professor.id_curso_materia
        inner join tbl_curso as curso 
            on tbl_curso_materia.id_curso = curso.id
        inner join tbl_materia as materia
            on tbl_curso_materia.id_materia = materia.id
    order by tbl_turma_curso_materia_professor.id desc limit 1;
`

    let rsTurmaCursoMateriaProf = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaCursoMateriaProf.length > 0) {
        return rsTurmaCursoMateriaProf
    } else {
        return false
    }
}

const mdlUpdateTurmaCursoMateriaProf = async (dados) => {
    let sql = `update tbl_turma_curso_materia_professor
	set id_turma = ${dados.id_turma},
		id_curso_materia = ${dados.id_curso_materia},
        id_professor = ${dados.id_professor}
	where id = ${dados.id};
    `
    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}


/************************** FUNÇÕES COMPLEMTARES **************************/

const mdlGetTurmasByIdProfessor = async (idProfessor) => {
    let sql = `select 
	    turma.id as id_turma, turma.nome as nome_turma, 
        turma.semestre as semestre_turma, 
        turma.data_inicio as data_inicio_turma, 
        turma.descricao as descricao_turma,
        date_format(turma.data_conclusao, '%m/%Y') as conclusao_turma
    from tbl_turma_curso_materia_professor
	    inner join tbl_turma as turma
		    on turma.id = tbl_turma_curso_materia_professor.id_turma
	    inner join tbl_professor as professor 
		    on professor.id = tbl_turma_curso_materia_professor.id_professor
	    inner join tbl_curso_materia 
		    on tbl_curso_materia.id = tbl_turma_curso_materia_professor.id_curso_materia
	    inner join tbl_curso as curso 
		    on tbl_curso_materia.id_curso = curso.id
	    inner join tbl_materia as materia
		    on tbl_curso_materia.id_materia = materia.id
	where professor.id = ${idProfessor};
`

    let rsTurmaCursoMateriaProf = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaCursoMateriaProf.length > 0) {
        return rsTurmaCursoMateriaProf
    } else {
        return false
    }
}

const mdlGetMateriasByIdProfessor = async (idProfessor) => {
    let sql = `select
	    materia.id as id_materia, materia.nome as nome_materia, materia.sigla as sigla_materia, 
        materia.carga_horaria as carga_horaria_materia, materia.descricao as descricao_materia
    from tbl_turma_curso_materia_professor
	    inner join tbl_turma as turma
		    on turma.id = tbl_turma_curso_materia_professor.id_turma
	    inner join tbl_professor as professor 
		    on professor.id = tbl_turma_curso_materia_professor.id_professor
	    inner join tbl_curso_materia 
    		on tbl_curso_materia.id = tbl_turma_curso_materia_professor.id_curso_materia
	    inner join tbl_curso as curso 
		    on tbl_curso_materia.id_curso = curso.id
	    inner join tbl_materia as materia
		    on tbl_curso_materia.id_materia = materia.id
    where professor.id = ${idProfessor};
`

    let rsTurmaCursoMateriaProf = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaCursoMateriaProf.length > 0) {
        return rsTurmaCursoMateriaProf
    } else {
        return false
    }
}

const mdlGetTarefasByIdProfessor = async (idProfessor) => {
    let sql = `select 
	    tarefa.id as id_tarefa,
        tarefa.nome as nome_tarefa,
        tarefa.foto_peca
    from tbl_tarefa_turma_curso_materia_professor
	    inner join tbl_tarefa as tarefa 
		    on tarefa.id = tbl_tarefa_turma_curso_materia_professor.id_tarefa
	    inner join tbl_turma_curso_materia_professor
		    on tbl_turma_curso_materia_professor.id = tbl_tarefa_turma_curso_materia_professor.id_turma_curso_materia_professor
	    inner join tbl_professor as professor
		    on tbl_turma_curso_materia_professor.id_professor = professor.id
    where tbl_turma_curso_materia_professor.id_professor = ${idProfessor};
    `

    let rsTurmaCursoMateriaProf = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaCursoMateriaProf.length > 0) {
        return rsTurmaCursoMateriaProf
    } else {
        return false
    }
}

const mdlGetProfessoresByIdCurso = async (idCurso) => {
    let sql = `select 
        professor.id as id_professor, professor.nome as nome_professor, professor.telefone as telefone_professor
    from tbl_turma_curso_materia_professor
	    inner join tbl_turma as turma
		    on turma.id = tbl_turma_curso_materia_professor.id_turma
	    inner join tbl_professor as professor 
		    on professor.id = tbl_turma_curso_materia_professor.id_professor
	    inner join tbl_curso_materia 
		    on tbl_curso_materia.id = tbl_turma_curso_materia_professor.id_curso_materia
	    inner join tbl_curso as curso 
		    on tbl_curso_materia.id_curso = curso.id
	    inner join tbl_materia as materia
		    on tbl_curso_materia.id_materia = materia.id
	    where curso.id = ${idCurso};
    `

    let rsTurmaCursoMateriaProf = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaCursoMateriaProf.length > 0) {
        return rsTurmaCursoMateriaProf
    } else {
        return false
    }
}

const mdlGetMateriasByIdCurso = async (idCurso) => {
    let sql = `select 
        materia.id as id_materia, materia.nome as nome_materia, materia.sigla as sigla_materia, 
        materia.carga_horaria as carga_horaria_materia, materia.descricao as descricao_materia
    from tbl_turma_curso_materia_professor
	    inner join tbl_turma as turma
		    on turma.id = tbl_turma_curso_materia_professor.id_turma
	    inner join tbl_professor as professor 
		    on professor.id = tbl_turma_curso_materia_professor.id_professor
	    inner join tbl_curso_materia 
		    on tbl_curso_materia.id = tbl_turma_curso_materia_professor.id_curso_materia
	    inner join tbl_curso as curso 
		    on tbl_curso_materia.id_curso = curso.id
	    inner join tbl_materia as materia
		    on tbl_curso_materia.id_materia = materia.id
    where curso.id = ${idCurso};
    `

    let rsTurmaCursoMateriaProf = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaCursoMateriaProf.length > 0) {
        return rsTurmaCursoMateriaProf
    } else {
        return false
    }
}

const mdlGetTurmasByIdCurso = async (idCurso) => {
    let sql = `select
	turma.id as id_turma, turma.nome as nome_turma, turma.semestre as semestre_turma, turma.data_inicio as data_inicio_turma, turma.descricao as descricao_turma, 
    date_format(turma.data_conclusao, '%m/%Y') as conclusao_turma
from tbl_turma_curso_materia_professor
	inner join tbl_turma as turma
		on turma.id = tbl_turma_curso_materia_professor.id_turma
	inner join tbl_professor as professor 
		on professor.id = tbl_turma_curso_materia_professor.id_professor
	inner join tbl_curso_materia 
		on tbl_curso_materia.id = tbl_turma_curso_materia_professor.id_curso_materia
	inner join tbl_curso as curso 
		on tbl_curso_materia.id_curso = curso.id
	inner join tbl_materia as materia
		on tbl_curso_materia.id_materia = materia.id
where curso.id = ${idCurso};
    `

    let rsTurmaCursoMateriaProf = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaCursoMateriaProf.length > 0) {
        return rsTurmaCursoMateriaProf
    } else {
        return false
    }
}

const mdlGetTarefasByIdMateria = async (idMateria) => {
    let sql = `select 
	    tarefa.id as id_tarefa,
        tarefa.nome as nome_tarefa,
        tarefa.foto_peca
    from tbl_tarefa_turma_curso_materia_professor
	    inner join tbl_tarefa as tarefa 
		    on tarefa.id = tbl_tarefa_turma_curso_materia_professor.id_tarefa
	    inner join tbl_turma_curso_materia_professor
		    on tbl_turma_curso_materia_professor.id = tbl_tarefa_turma_curso_materia_professor.id_turma_curso_materia_professor
	    inner join tbl_professor as professor
		    on tbl_turma_curso_materia_professor.id_professor = professor.id
    where materia.id = ${idMateria};
    `

    let rsTurmaCursoMateriaProf = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaCursoMateriaProf.length > 0) {
        return rsTurmaCursoMateriaProf
    } else {
        return false
    }
}



module.exports = {
    mdlSelectAllTurmaCursoMateriaProf,
    mdlSelectAllTurmaCursoMateriaProfByID,
    mdlSelectTurmaCursoMateriaProfByIdProfessor,
    mdlSelectTurmaCursoMateriaProfByIdProfessorAndIdCurso,
    mdlSelectTurmaCursoMateriaProfByIdProfessorAndIdTurma,
    mdlSelectMateriasByIdMatricula,
    mdlSelectLastByID,
    mdlInsertTurmaCursoMateriaProf,
    mdlUpdateTurmaCursoMateriaProf,

    mdlGetTurmasByIdProfessor,
    mdlGetMateriasByIdProfessor,
    mdlGetTarefasByIdProfessor,

    mdlGetProfessoresByIdCurso,
    mdlGetMateriasByIdCurso,
    mdlGetTurmasByIdCurso,

    mdlGetTarefasByIdMateria

}

