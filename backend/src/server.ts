import { createApp } from './app';
import { env } from './config/env';

const app = createApp();

app.listen(env.puerto, () => {
  console.log(`Backend escuchando en http://localhost:${env.puerto}`);
});
