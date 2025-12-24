/* Create configuation file */ 

const environments = {
  'staging': {
    'port': 3000,
    'envName': 'staging'
  },
  'production': {
    'port': 5000,
    'envName': 'production'
  }
}
const currentEnv = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';
const envToExport = typeof(environments[currentEnv]) === 'object' ? environments[currentEnv] : environments.staging;
module.exports = envToExport;