const express = require('express');
const app = express();
//routes
const userRouter = require('./routes/management-route');
const authRouter = require('./routes/auth-route');
const rentRouter = require('./routes/rent-route');
//middleware
const notFoundMiddleware = require('./middleware/not-found');
const {
  authenticateUser,
  authorizePermissions,
} = require('./middleware/authentication');
app.use(express.json());
app.get('/', (req, res) => {
  res.send('<h1>Rental API</h1>');
});
app.use('/api/v1/auth', authRouter);
app.use(
  '/api/v1',
  [authenticateUser, authorizePermissions('admin', 'verified')],
  rentRouter
);
app.use(
  '/api/v1/management',
  [authenticateUser, authorizePermissions('admin')],
  userRouter
);
app.use(notFoundMiddleware);
const start = async () => {
  try {
    app.listen(process.env.PORT, () =>
      console.log(
        `🚀 Server is listening on ${process.env.HOST} port ${process.env.PORT}`
      )
    );
  } catch (error) {
    console.log(error);
  }
};
start();
