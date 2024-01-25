import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('musicFile'), (req, res) => {
  try {
    const musicFile = req.file;

    const trackListPath = 'src/assets/trackList.js';
    const existingTracks = JSON.parse(
      fs.readFileSync(trackListPath, { encoding: 'utf-8' })
    ) || [];
    const updatedTracks = [...existingTracks, { name: musicFile.originalname, buffer: musicFile.buffer }];

    const updatedContent = `export default ${JSON.stringify(updatedTracks, null, 2)};`;

    fs.writeFileSync(trackListPath, updatedContent);

    res.json({ success: true, message: 'Track list updated successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
