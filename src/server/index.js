import path from 'path';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import connectRedis from 'connect-redis';
import { sessionStore, PORT } from './config';
// import { PORT } from './config';
import { beforeInterceptor, afterInterceptor } from './core/interceptor';
import render from './render';
import router from './router';

const app = express();
const RedisStore = connectRedis(session);

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(
  session({
    name: `sid-${PORT}`,
    resave: false,
    saveUninitialized: false,
    secret: `fe-fm`,
    store: new RedisStore(sessionStore),
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(beforeInterceptor);
app.use(router);
app.use(render);
app.use(afterInterceptor);

app.use((req, res, next) => {
  const err = new Error('资源没有找到');
  err.status = 404;
  next(err);
});

/* eslint-disable no-unused-vars */
app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status);
  if (error instanceof Error)
    res.json({
      status,
      message: error.message || '服务器内部错误',
    });
  else res.json(error);
});
if (!module.hot) {
  /* eslint-disable no-undef */
  app.listen(PORT, () => {
    /* eslint-disable no-undef */
    /* eslint-disable no-console */
    console.info(`The server is running at http://localhost:${PORT}/`);
  });
} else if (!app.hot) {
  app.hot = module.hot;
  module.hot.accept(['./router', '../App', './render']);
}

export default app;
