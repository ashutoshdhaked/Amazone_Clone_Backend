const { writeFile } = require('fs').promises;

async function storeImage(image) {
    try {  
        const buffer = image.buffer;
        const path = `${process.cwd()}\\uploads\\${image.originalname}`;
        await writeFile(path, buffer);
        return path;
    } catch (error) {
        console.log("Error In Storing Image ",error);
        return null;
    }
}

module.exports = storeImage;
