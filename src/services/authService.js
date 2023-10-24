import httpStatus from "http-status";
import { conflictError } from "../errors/conflictError.js";
import { notFoundError } from "../errors/notFoundError.js";
import { authRepository } from "../repositories/authRepository.js";
import { unauthorizedError } from "../errors/unauthorizedError.js";
import bcrypt from "bcrypt";
import { sessionRepository } from "../repositories/sessionRepository.js";
import { v4 as uuid } from "uuid";

// Função que aplica as regras de negócio da aplicação
async function signUp(name, email, password) {

    //Aqui verificamos se o usuário que está tentando se cadastrar já existe
    const verifyUser = await authRepository.verifyUser(email);
    if (verifyUser.rows.length > 0) throw conflictError();

    // Com a biblioteca bcrypt criptografamos a senha para que ela fique segura no banco de dados
    const hash = bcrypt.hashSync(password, 10);

    //Aqui chamamos a função que cria o usuário no banco de dados
    const newUser = await authRepository.signUp(name, email, hash);
    return "ok";
}

async function signIn(email, password) {
    // Verificamos se o usuário existe
    const user = await authRepository.verifyUser(email);
    if (user.rows.length === 0) throw notFoundError();

    // Verificamos se a senha está correta
    const isPasswordCorrect = bcrypt.compareSync(password, user.rows[0].password)
    if (!isPasswordCorrect) throw unauthorizedError();

    // Criamos o token e geramos uma sessão após o usuário realizar o login
    const token = uuid();
    await sessionRepository.newSession(token, user.rows[0].id);

    return { id: user.rows[0].id, userName: user.rows[0].username, token: token }
}

export const authService = {
    signUp,
    signIn
}