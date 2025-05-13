# Sprite Sheet Generator

This project provides a script and an API server to generate sprite sheets from PNG images using [free-tex-packer-core](https://www.npmjs.com/package/free-tex-packer-core).

---

## Setup

1. **Clone the repository and install dependencies:**
   ```sh
   npm install
   ```

2. **(Optional) Create a `.env` file for configuration:**
   - Only needed for advanced options (e.g., port, texture settings). 
   - Example:
     ```
     PORT=3000
     TEXTURE_NAME=spritesheet
     WIDTH=4096
     HEIGHT=4096
     PADDING=2
     EXPORTER=JsonArray
     ```

---

## Running the API Server

1. **Start the server:**
   ```sh
   node server.js
   ```
   You should see:
   ```
   SpriteSheet Generator server running on port 3000
   ```

2. **Check the API status:**
   - Open your browser or use curl:
     ```sh
     curl http://localhost:3000/
     ```
   - You will receive a pretty-printed JSON response describing the API.

---

## API Usage

### **POST /generate-spritesheet**
Generate a spritesheet from images in a directory.

- **Request:**
  - Method: `POST`
  - URL: `http://localhost:3000/generate-spritesheet`
  - Body (JSON):
    ```json
    {
      "inputDir": "./images",         // Path to input images directory (required)
      "outputDir": "./output"         // Path to output directory (required)
    }
    ```
- **Response:**
  - On success:
    ```json
    {
      "success": true,
      "outputDir": "./output",
      "files": ["./output/spritesheet.png", "./output/spritesheet.json"]
    }
    ```
  - On error:
    ```json
    {
      "success": false,
      "error": "Error message"
    }
    ```

#### Example using curl:
```sh
curl -X POST http://localhost:3000/generate-spritesheet \
  -H "Content-Type: application/json" \
  -d '{"inputDir":"./images","outputDir":"./output"}'
```

---

### **GET /**
Returns API status and endpoint information.

- **Request:**
  - Method: `GET`
  - URL: `http://localhost:3000/`
- **Response:**
  - Pretty-printed JSON with API info and usage.

---

## Advanced Configuration

You can set additional options in your `.env` file for advanced sprite sheet settings (e.g., `TEXTURE_NAME`, `WIDTH`, `HEIGHT`, `PADDING`, `EXPORTER`, etc.).

- These are only used if you want to customize the sprite sheet generation beyond the API defaults.
- See the top of `pack-sprites.js` for all available options.

---

## Legacy CLI Usage (Optional)

You can still use the CLI scripts for direct sprite sheet generation:

- **Basic script:**
  ```sh
  npm run pack
  ```
- **Command-line version:**
  ```sh
  node pack-sprites-cli.js [options]
  ```
  See `pack-sprites-cli.js --help` for all options.

---

## Output

The script or API will generate two files in the output directory:
- `spritesheet.png`: The sprite sheet image (name depends on textureName setting)
- `spritesheet.json`: The JSON file containing coordinates of each sprite

---

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

---

## Troubleshooting
- Ensure your `inputDir` and `outputDir` exist and are accessible.
- The API requires both directories to be specified in every request.
- For advanced errors, check the server logs for details. 