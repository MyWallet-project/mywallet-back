import httpStatus from "http-status";
import { authService } from "../services/authService.js";

//Função que recebe todos os dados do front-end e chama a função do arquivo service para verificar 
//se tudo está correto para realização do cadastro
async function signUp(req, res) {
    
    const { name, email, password } = req.body;
    await authService.signUp(name, email, password);

    //retorna o status 201 se tudo der certo
    res.sendStatus(httpStatus.CREATED);
}

//Função que recebe todos os dados do front-end e chama a função do arquivo service para verificar 
//se tudo está correto para realização do login
async function signIn(req, res) {
    const { email, password } = req.body
    const user = await authService.signIn(email, password);

    // Retorna informações necessárias para o front-end fazer requisições futuras
    res.status(httpStatus.OK).send({ id: user.id , token: user.token, userName: user.userName })
}


export const authController = {
    signUp,
    signIn
}