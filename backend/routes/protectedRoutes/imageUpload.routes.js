const { successResponse } = require('../../helpers/response');

module.exports = (app, io) => {
  const multer = require('multer');

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, require('path').join(__dirname, '../../public/images'));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = file.originalname.split('.');
      const extension = filename.pop();
      cb(null, filename.join('') + '-' + uniqueSuffix + '.' + extension);
    },
  });

  const upload = multer({ storage });

  app.post('/upload', upload.single('image'), (req, res) => {
    return successResponse(res, {
      url: '/api/images/' + req.file.filename,
    });
  });
};
