import express from "express";
import jwtAuthenticationMiddleware from "./middleware/jwt.authentication.middleware";
import errorHandler from "./middleware/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";
const app = express();

//config globais
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Config rotas

app.use(statusRoute)
app.use(authorizationRoute)

app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);


//congiguracoes de erro
app.use(errorHandler)

//config portas
app.listen(3000, () => {
    console.log("Aplicação execultando na porta 3k")
})