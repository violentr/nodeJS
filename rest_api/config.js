/* Create configuation file */ 

const environments = {
  'staging': {
    'httpsPort': 3001,
    'httpPort': 3000,
    'envName': 'staging'
  },
  'production': {
    'httpsPort': 5001,
    'httpPort': 5000,
    'envName': 'production'
  }
}
const currentEnv = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';
const envToExport = typeof(environments[currentEnv]) === 'object' ? environments[currentEnv] : environments.staging;
module.exports = envToExport;