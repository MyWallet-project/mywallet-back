// Função chamada quando um usuário tenta acessar a aplicação com um email não cadastrado
export function notFoundError() {
    return {
        name: 'notFoundError',
        message: "Este e-mail não está cadastrado!"
    };
}