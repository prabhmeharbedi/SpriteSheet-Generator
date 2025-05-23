const fs = require('fs');
const path = require('path');
const texturePacker = require('free-tex-packer-core');
require('dotenv').config(); // Load environment variables from .env file

//=============================================================================
// CONFIGURATION: MODIFY THESE PARAMETERS IN .env FILE
//=============================================================================
const CONFIG = {
    // Sprite sheet options
    textureName: process.env.TEXTURE_NAME || 'atlas',
    width: parseInt(process.env.WIDTH || '4096'),
    height: parseInt(process.env.HEIGHT || '4096'),
    padding: parseInt(process.env.PADDING || '2'),
    
    // Processing options
    allowRotation: process.env.ALLOW_ROTATION === 'true',
    detectIdentical: process.env.DETECT_IDENTICAL !== 'false',
    allowTrim: process.env.ALLOW_TRIM === 'true',
    removeFileExtension: process.env.REMOVE_FILE_EXTENSION === 'true',
    
    // Advanced options
    fixedSize: process.env.FIXED_SIZE === 'true',
    powerOfTwo: process.env.POWER_OF_TWO === 'true',
    prependFolderName: process.env.PREPEND_FOLDER_NAME === 'true',
    scale: parseFloat(process.env.SCALE || '1'),
    
    // Export format
    exporter: process.env.EXPORTER || 'JsonHash'
};

// Print the configuration for debugging
console.log('Using configuration:');
console.log(CONFIG);
//=============================================================================

/**
 * Pack textures from a directory into a sprite sheet
 * @param {string} inputDir - Directory containing PNG/JPG images
 * @param {string} outputDir - Directory where the sprite sheet and JSON will be saved
 * @param {Object} options - Configuration settings
 */
function packTextures(inputDir, outputDir, options) {
    return new Promise((resolve, reject) => {
        // Create output directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // Get all image files from the input directory
        const files = fs.readdirSync(inputDir)
            .filter(file => ['.png', '.jpg', '.jpeg'].includes(path.extname(file).toLowerCase()));
        
        if (files.length === 0) {
            reject(new Error(`No image files found in ${inputDir}`));
            return;
        }
        
        console.log(`Found ${files.length} images to pack`);
        
        // Load images
        const images = files.map(file => ({
            path: file,
            contents: fs.readFileSync(path.join(inputDir, file))
        }));
        
        // Start packing
        console.log('Packing textures...');
        
        texturePacker(images, options, (files) => {
            try {
                if (!Array.isArray(files)) {
                    console.error('❌ texturePacker did not return a valid files array.');
                    console.error('Images:', images);
                    console.error('Options:', options);
                    reject(new Error('texturePacker failed: output files is undefined or not an array. Check your input images and options.'));
                    return;
                }
                console.log(`Packing complete. Generated ${files.length} files.`);
                
                const generatedFiles = [];
                
                // Save output files
                for (let item of files) {
                    const filePath = path.join(outputDir, item.name);
                    
                    // For images (buffer)
                    if (item.buffer) {
                        fs.writeFileSync(filePath, item.buffer);
                        console.log(`Created image: ${filePath}`);
                    }
                    // For JSON/text files (content)
                    else {
                        fs.writeFileSync(filePath, item.content);
                        console.log(`Created data file: ${filePath}`);
                    }
                    
                    generatedFiles.push(filePath);
                }
                
                console.log('All files saved successfully!');
                resolve({
                    outputDir,
                    files: generatedFiles
                });
            } catch (error) {
                reject(error);
            }
        });
    });
}

// Run the packing process with the configuration
if (require.main === module) {
    packTextures(CONFIG.inputDir, CONFIG.outputDir, CONFIG)
        .then(result => {
            console.log('✅ Sprite sheet generation complete!');
            console.log(`Files created in: ${result.outputDir}`);
        })
        .catch(error => {
            console.error('❌ Error generating sprite sheet:', error);
        });
}

module.exports = { packTextures, CONFIG };