const app = require('./app');
app.listen(2443, () => {
    console.log(`App is running at 2443 / in ${app.get('env')} mode`);
  });