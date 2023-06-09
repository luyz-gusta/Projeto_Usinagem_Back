/*********************************************************************************************************
 * Objetivo: Arquivo responsavel por padronizar as mensagens de ERRO, SUCESSO, FUNÇÕES, VARIAVEIS
 * Autor: Luiz Gustavo e Muryllo Vieira
 * Data: 22/05/2023
 * Versão: 1.0
*********************************************************************************************************/

/*************************************** MENSAGENS DE ERRO ***************************************/
const ERROR_REQUIRE_FIELDS = {status: 400, message: 'NÃO FOI PREENCHIDO TODOS OS CAMPOS OBRIGATÓRIOS'}

const ERROR_INVALID_CONTENT_TYPE = {status: 415, message: 'O TIPO DE MÍDIA CONTENT-TYPE DA SOLICITAÇÃO NÃO É COMPATÍVEL COM O SERVIDOR. TIPO ACEITÁVEL: [application/json]'}

const ERROR_INVALID_ID = {status: 400, message: 'O ID INFORMADO NA REQUISIÇÃO NÃO É VALIDADO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_PARAMS = {status: 400, message: 'O PARAMETRO INFORMADO NA REQUISIÇÃO NÃO É VALIDADO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_EMAIL = {status: 400, message: 'O EMAIL INFORMADO NA REQUISIÇÃO NÃO É VALIDADO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_EMAIL_SENHA = {status: 400, message: 'O EMAIL OU SENHA INFORMADO NA REQUISIÇÃO NÃO É VALIDADO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_NOME = {status: 400, message: 'O NOME INFORMADO NA REQUISIÇÃO NÃO É VALIDADO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_TELEFONE = {status: 400, message: 'O TELEFONE INFORMADO NA REQUISIÇÃO NÃO É VALIDADO'}

const ERROR_INVALID_NIVEL = {status: 400, message: 'O NIVEL INFORMADO NA REQUISIÇÃO NÃO É VALIDADO, OU NÃO FOI ENCAMINHADO'}

const ERROR_REGISTER_NOT_FOUND= {status: 404, message: 'O SERVIDOR NÃO ENCONTROU O RECURSO SOLICITADO.'}

const ERROR_INTERNAL_SERVER = {status: 500, message: 'DEVIDO A UM ERRO INTERNO NO SERVIDOR, NÃO FOI POSSIVEL PROCESSAR A REQUISIÇÃO'}

const ERROR_EXISTING_EMAIL = {status: 400, message: 'O EMAIL INFORMADO JÁ EXISTE NO SISTEMA'}

const ERROR_EXISTING_CURSO = {status: 400, message: 'O NOME DO CURSO INFORMADO JÁ EXISTE NO SISTEMA'}

const ERROR_NOT_EXISTING_ID_USUARIO = {status: 400, message: 'O ID DE USUARIO INFORMADO NÃO EXISTE NO SERVIDOR'}

const ERROR_EXISTING_SEMESTRE = {status: 400, message: 'O NUMERO DE SEMESTRE INFORMADO JÁ EXISTE NO SISTEMA'}

const ERROR_EXISTING_PROFESSOR = {status: 400, message: 'O NIF DO PROFESSOR INFORMADO JÁ EXISTE NO SISTEMA'}

const ERROR_INVALID_SIGLA = {status: 400, message: 'A SIGLA INFORMADA NA REQUISIÇÃO NÃO É VALIDADA, OU NÃO FOI ENCAMINHADA'}

const ERROR_INVALID_ID_ALUNO_TAREFA = {status: 400, message: 'O ID DO ALUNO OU DE TAREFA INFORMADO NA REQUISIÇÃO NÃO É VALIDADO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_ID_MATRICULA_TAREFA = {status: 400, message: 'O ID DA MATRICULA OU DE TAREFA INFORMADO NA REQUISIÇÃO NÃO É VALIDADO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_ID_CURSO = {status: 400, message: 'O ID DO CURSO INFORMADA NA REQUISIÇÃO NÃO É VALIDADA, OU NÃO FOI ENCAMINHADA'}

const ERROR_INVALID_ID_TAREFA = {status: 400, message: 'O ID DA TAREFA INFORMADA NA REQUISIÇÃO NÃO É VALIDADA, OU NÃO FOI ENCAMINHADA'}

const ERROR_INVALID_ID_TIPO_TAREFA = {status: 400, message: 'O ID DO TIPO DA TAREFA INFORMADO NA REQUISIÇÃO NÃO É VALIDADO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_ID_CRITERIO = {status: 400, message: 'O ID DO CRITERIO INFORMADA NA REQUISIÇÃO NÃO É VALIDADA, OU NÃO EXISTE'}

const ERROR_INVALID_ID_SEMESTRE_CURSO = {status: 400, message: 'O ID DO CURSO OU DO SEMESTRE INFORMADA NA REQUISIÇÃO NÃO É VALIDADA, OU NÃO FOI ENCAMINHADA'}

const ERROR_DATE_BIRTH_INVALID = {status: 400, message: 'A DATA DE NASCIMENTO NÃO VEIO NO PADRÃO ADEQUADO, POR FAVOR, INSIRA COMO VALOR NULO OU UM VALOR NO PADRÃO UNIVERSAL'}

const ERROR_INVALID_ID_PROFESSOR_MATERIA = {status: 400, message: 'O ID DO PROFESSOR OU DA MATERIA INFORMADA NA REQUISIÇÃO NÃO É VALIDADA, OU NÃO FOI ENCAMINHADA'}

const ERROR_INVALID_NUMBER = {status: 400, message: 'O NUMERO DA MATRICULA INFORMADA NA REQUISIÇÃO NÃO É VALIDADA, OU NÃO FOI ENCAMINHADA'}

const ERROR_INVALID_ID_STATUS_USUARIO_ALUNO = {status: 400, message: 'O ID DO STATUS DA MATRICULA, ID DO USUARIO OU ID DO ALUNO INFORMADO NA REQUISIÇÃO NÃO É VALIDADO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_ID_RESULTADO_DESEJADO = {status: 400, message: 'O ID DO RESULTADO DESEJADO INFORMADA NA REQUISIÇÃO NÃO É VALIDADA, OU NÃO EXISTE'}

/*************************************** MENSAGENS DE SUCESSO ***************************************/
const SUCCESS_CREATED_ITEM = {status: 201, message: 'ITEM CRIADO COM SUCESSO'}

const SUCCESS_UPDATED_ITEM = {status: 200, message: 'ITEM ATUALIZADO COM SUCESSO'}

const SUCCESS_DELETED_ITEM = {status: 200, message: 'ITEM DELETADO COM SUCESSO'}

const SUCCESS_REQUEST = {status: 200, message: 'REQUISIÇÃO BEM SUCEDIDA'}


module.exports = {
    ERROR_REQUIRE_FIELDS,
    ERROR_INTERNAL_SERVER,
    ERROR_INVALID_ID,
    ERROR_INVALID_PARAMS,
    ERROR_INVALID_EMAIL,
    ERROR_INVALID_EMAIL_SENHA,
    ERROR_INVALID_CONTENT_TYPE,
    ERROR_INVALID_NOME,
    ERROR_INVALID_NIVEL,
    ERROR_REGISTER_NOT_FOUND,
    ERROR_EXISTING_EMAIL,
    ERROR_DATE_BIRTH_INVALID,
    ERROR_EXISTING_SEMESTRE,
    ERROR_INVALID_SIGLA,
    ERROR_INVALID_TELEFONE,
    ERROR_INVALID_ID_SEMESTRE_CURSO,
    ERROR_INVALID_ID_CURSO,
    ERROR_EXISTING_CURSO,
    ERROR_EXISTING_PROFESSOR,
    ERROR_INVALID_ID_PROFESSOR_MATERIA,
    ERROR_INVALID_ID_ALUNO_TAREFA,
    ERROR_INVALID_ID_TIPO_TAREFA,
    ERROR_NOT_EXISTING_ID_USUARIO,
    ERROR_INVALID_ID_CRITERIO,
    ERROR_INVALID_NUMBER,
    ERROR_INVALID_ID_STATUS_USUARIO_ALUNO,
    ERROR_INVALID_ID_MATRICULA_TAREFA,
<<<<<<< HEAD
    ERROR_INVALID_ID_RESULTADO_DESEJADO,
=======
    ERROR_INVALID_ID_TAREFA,
>>>>>>> 931328751ee0fc52299bc81d7916fcd67cedd445
    SUCCESS_CREATED_ITEM,
    SUCCESS_UPDATED_ITEM,
    SUCCESS_DELETED_ITEM,
    SUCCESS_REQUEST
}