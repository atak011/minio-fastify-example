import {getFile, uploadFile} from "../helper/minio.js";


const fileRouter = () => async (app) => {
    app.get('/', async (req, res) => {
        const fileName = req.query.fileName;
        const body = await getFile('test',fileName);
        return { body }
    });

    app.post('/', async (req, res) => {
        const file = await req.file();

        if(!file){
            res.code(400).send({ error: 'No file uploaded' });
            return;
        }

        const bucketName = 'test';
        const fileName = 'test.png';
        const filePath = file.file;

        uploadFile(bucketName,filePath,fileName);

        res.send({message: 'Uploaded !!'})
    });
}

export default fileRouter;
