const dotenv = require('dotenv');
dotenv.config({ path: '.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, REPO_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'app'
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: REPO_PATH,
      path: DEPLOY_PATH,
      'post-deploy': `cd ${DEPLOY_PATH}/source/frontend && npm i && npm run build`,
    },
  },
};