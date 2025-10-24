import app from './app';
import 'dotenv/config';

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server started on port : http://localhost:${port}`);
});
