export default {
  jwt: {
    secret: process.env.SECRET_APP || 'default',
    expireIn: '1d',
  },
};
