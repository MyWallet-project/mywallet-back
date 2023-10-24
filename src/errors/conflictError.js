// Função chamada quando já existe um usuário cadastrado com o email passado no body
export function conflictError() {
    return {
        name: 'ConflictError',
        message: "Este e-mail já foi cadastrado!",
    };
}