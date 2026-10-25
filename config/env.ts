import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const testEnv = (process.env.TEST_ENV || 'qa').toLowerCase();

if (!['dev', 'qa', 'uat'].includes(testEnv)) {
  throw new Error(
    `Invalid TEST_ENV: ${testEnv}. Use dev, qa, or uat.`
  );
}

const envFile = path.resolve(
  process.cwd(),
  'env-files',
  `.env.${testEnv}`
);

if (fs.existsSync(envFile)) {
  const result = dotenv.config({ path: envFile });

  if (result.error) {
    throw new Error(`Unable to load environment file: ${envFile}`);
  }
}

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}. ` +
      `Check your local env file or GitHub Secrets.`
    );
  }

  return value;
}

export const env = {
  baseUrl: getEnv('BASE_URL'),
  username: getEnv('AUTH_USERNAME'),
  password: getEnv('AUTH_PASSWORD'),
};   

