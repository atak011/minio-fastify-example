import Fastify from 'fastify';
import fileRouter from "./routes/file.router.js";

const app = Fastify({
    logger: true
});

app.register(import('fastify-multipart'));
app.register(fileRouter(), { prefix: '/api/files' });

const start = async () => {
    try {
        await app.listen(3000);
    } catch (err) {
        app.log.error(err);
    }
}

start();
