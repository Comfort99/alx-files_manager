import dbClient from '../utils/db';

const waitConnection = () => new Promise((resolve, reject) => {
  let i = 0;
  const repeatFct = async () => {
    await new Promise((res) => setTimeout(res, 1000));
    i += 1;
    if (i >= 10) {
      reject(new Error('Connection failed after 10 attempts'));
    } else if (!dbClient.isAlive()) {
      repeatFct();
    } else {
      console.log('MongoDB connected successfully');
      resolve();
    }
  };
  repeatFct();
});

const startServer = async (api) => {
  const port = process.env.PORT || 5000;
  const env = process.env.ENV || 'dev';
  await waitConnection();

  api.listen(port, () => {
    console.log(`[${env}] API has started listening at port:${port}`);
  });
};

export default startServer;
