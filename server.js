require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { packTextures } = require('./pack-sprites');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/generate-spritesheet', async (req, res) => {
    const { inputDir, outputDir, options } = req.body;
    if (!inputDir || !outputDir) {
        return res.status(400).json({ error: 'inputDir and outputDir are required.' });
    }
    try {
        // Use provided options or default to empty object
        const result = await packTextures(inputDir, outputDir, options || {});
        res.json({ success: true, ...result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/', (req, res) => {
    const info = {
        message: 'SpriteSheet Generator API is running.',
        endpoints: {
            generate: {
                method: 'POST',
                path: '/generate-spritesheet',
                description: 'Generate a spritesheet from images in a directory.',
                body: {
                    inputDir: 'Path to input images directory (required)',
                    outputDir: 'Path to output directory (required)'
                }
            }
        }
    };
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(info, null, 2));
});

app.listen(PORT, () => {
    console.log(`SpriteSheet Generator server running on port ${PORT}`);
}); 