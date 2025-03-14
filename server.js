const app = require('./app');
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "upgrade-insecure-requests");
  next();
});
app.listen(2443, () => {
    console.log(`App is running at 2443 / in ${app.get('env')} mode`);
  });