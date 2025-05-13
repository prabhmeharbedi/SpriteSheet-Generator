# Sprite Sheet Generator

This script uses free-tex-packer-core to generate sprite sheets from PNG images.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with your configuration (or use default values):
   ```
   npm run create-env
   ```

3. The script will automatically process images from the `images` directory and output the results to the `output` directory.

## Configuration

### Using Environment Variables (.env file)

The easiest way to configure the texture packer is by editing the `.env` file. 
After running `npm run create-env`, you'll have a file with configuration parameters.

Just edit the values as needed and save the file. Then run the packer and it will use your settings:

```
npm run pack
```

### Using the CONFIG Object (Alternative)

All configuration parameters are also in a `CONFIG` object at the top of `pack-sprites.js`:

```javascript
const CONFIG = {
    // Input/output paths
    inputDir: process.env.INPUT_DIR || path.join(__dirname, 'images'),
    outputDir: process.env.OUTPUT_DIR || path.join(__dirname, 'output'),
    
    // Sprite sheet options
    textureName: process.env.TEXTURE_NAME || 'atlas',
    width: parseInt(process.env.WIDTH || '4096'),
    height: parseInt(process.env.HEIGHT || '4096'),
    padding: parseInt(process.env.PADDING || '2'),
    
    // Processing options
    allowRotation: false,         // Allow rotating sprites for packing
    detectIdentical: true,        // Detect and reuse identical images
    allowTrim: false,             // Trim transparent pixels from sprites
    removeFileExtension: false,   // Remove file extensions from sprite names
    
    // Advanced options
    fixedSize: false,             // Use exactly the width/height specified
    powerOfTwo: false,            // Force dimensions to be powers of two
    prependFolderName: false,     // Add folder names to sprite names
    scale: 1,                     // Output scale factor
    
    // Export format
    exporter: 'JsonHash'          // Format: JsonHash, JsonArray, Phaser3, etc.
};
```

### Running the Basic Script

```
npm run pack
```

## Using the CLI Version

For more flexibility, you can use the command-line version which accepts parameters:

```
node pack-sprites-cli.js [options]
```

Options:
- `--input` - Input directory (default: ./images)
- `--output` - Output directory (default: ./output)
- `--textureName` - Base name for output files (default: game-atlas)
- `--width` - Maximum width of the sprite sheet (default: 4096)
- `--height` - Maximum height of the sprite sheet (default: 4096)
- `--padding` - Padding between sprites in pixels (default: 2)
- `--exporter` - Export format (default: JsonHash)
- `--allowRotation` - Allow sprite rotation (default: true)
- `--detectIdentical` - Detect identical images (default: true)
- `--allowTrim` - Trim transparent pixels (default: true)
- `--fixedSize` - Use fixed size (default: false)
- `--powerOfTwo` - Force power of two sizes (default: false)
- `--scale` - Output scale (default: 1)
- `--help` - Show help message

### Examples:

```
# Change input and output directories
node pack-sprites-cli.js --input ./my-images --output ./my-output

# Change texture name and export format
node pack-sprites-cli.js --textureName my-atlas --exporter Phaser3

# Set custom dimensions and padding
node pack-sprites-cli.js --width 2048 --height 2048 --padding 4
```

## Available Exporters

- `JsonHash` - JSON with sprites in a hash format (default)
- `JsonArray` - JSON with sprites in an array format
- `Phaser3` - Phaser 3 compatible JSON format
- `XML` - Plain XML format
- `Css` - CSS format
- `OldCss` - Old CSS format
- `Pixi` - PixiJS format
- `PhaserHash` - Phaser with sprites in a hash format
- `PhaserArray` - Phaser with sprites in an array format
- `Spine` - Spine atlas format
- `Cocos2d` - Cocos2d format
- `Unreal` - Unreal Engine format
- `Starling` - Starling format
- `Unity3D` - Unity3D format
- `GodotAtlas` - Godot Atlas format
- `GodotTileset` - Godot Tileset format

## Output

The script will generate two files in the `output` directory:
- `atlas.png`: The sprite sheet image (name depends on textureName setting)
- `atlas.json`: The JSON file containing coordinates of each sprite 