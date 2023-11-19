import AWS from 'aws-sdk';


const s3 = new AWS.S3({
    accessKeyId: '1SGJvpIkjR0C6WpxIzHZ',
    secretAccessKey: 'H6iwYVJVvqAiKgg5PRUntGJFcMWbFlze47B8KXcz',
    endpoint: 'http://localhost:9000',
    s3ForcePathStyle : true,
    signatureVersion: 'v4'
});


function uploadFile  (bucketName,filePath,fileName)  {

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: filePath,
    };

    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });

    return true;
}

async function getFile(bucketName, fileName) {

    const params = {
        Bucket: bucketName,
        Key: fileName,
    };

    const data = s3.getObject(params, function (err, data) {
        if (err) {
            throw err;
        }
    }).promise();

    return (await data).Body.toString();
}

export {uploadFile, getFile} ;
