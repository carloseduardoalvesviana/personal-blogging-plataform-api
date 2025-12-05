import fastify from "fastify";
import { routes } from "./routes";

const app = fastify();

app.register(routes);

app.setErrorHandler((error, _request, reply) => {
	console.error(error); // aqui aparece stack completa

	const errorMessage = error instanceof Error ? error.message : "Unexpected error";

	return reply.status(500).send({
		message: errorMessage,
	});
});

export { app };
