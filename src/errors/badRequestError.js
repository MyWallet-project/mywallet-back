// Função chamada quando alguma parte das informações esperadas vem incompleta
export function badRequestError(message) {
    return {
        name: 'badRequestError',
        message: message[0]
    };
}