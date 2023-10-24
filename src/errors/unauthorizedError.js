// Função chamada quando a senha está incorreta
export function unauthorizedError() {
    return {
        name: 'unauthorizedError',
        message: 'Senha incorreta'
    };
}