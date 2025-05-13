require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
    const { packTextures, CONFIG } = require('./pack-sprites');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan('combined'));

// Log every incoming request (method, url, and timestamp)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.post('/generate-spritesheet', async (req, res) => {
    const { inputDir, outputDir, options } = req.body;
    console.log('Received /generate-spritesheet request:', req.body);
    if (!inputDir || !outputDir) {
        console.log('Missing inputDir or outputDir');
        return res.status(400).json({ error: 'inputDir and outputDir are required.' });
    }
    try {
        const mergedOptions = { ...CONFIG, ...(options || {}) };
        const result = await packTextures(inputDir, outputDir, mergedOptions);
        console.log('Spritesheet generation successful:', result);
        res.json({ success: true, ...result });
    } catch (error) {
        console.error('Spritesheet generation failed:', error);
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