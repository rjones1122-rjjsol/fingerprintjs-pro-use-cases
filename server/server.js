import { Sequelize } from 'sequelize';

// Provision the database.
// In the Stackblitz environment, this db is stored locally in your browser.
// On the deployed demo, db is cleaned after each deployment.
export const sequelize = new Sequelize('database', '', '', {
  dialect: 'sqlite',
  storage: '.data/database.sqlite',
  logging: false,
});

// Demo origins.
// It is recommended to use production origins instead.
export const ourOrigins = ['https://fingerprinthub.com', 'https://localhost:3000', 'http://localhost:3000'];

export const messageSeverity = Object.freeze({
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
});

// Validates format of visitorId and requestId.
export function areVisitorIdAndRequestIdValid(visitorId, requestId) {
  const isVisitorIdFormatValid = /^[a-zA-Z0-9]{20}$/.test(visitorId);
  const isRequestIdFormatValid = /^\d{13}\.[a-zA-Z0-9]{6}$/.test(requestId);
  return isRequestIdFormatValid && isVisitorIdFormatValid;
}

export function ensureValidRequestIdAndVisitorId(req, res, visitorId, requestId) {
  if (!areVisitorIdAndRequestIdValid(visitorId, requestId)) {
    reportSuspiciousActivity(req);
    getForbiddenResponse(res, 'Forged visitorId or requestId detected. Try harder next time.', messageSeverity.Error);

    return false;
  }

  return true;
}

// Every identification request should be validated using the Fingerprint Pro Server API.
// Alternatively, on the Node.js environment one can use Server API Node.js library: https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk
// const client = new FingerprintJsServerApiClient({
//   region: Region.Global,
//   apiKey: 'F6gQ8H8vQLc7mVsVKaFx',
//   authenticationMode: AuthenticationMode.QueryParameter,
// });

// const serverApiFilter = { request_id: requestId };
// const visitorData = await client.getVisitorHistory(
//   visitorId,
//   serverApiFilter
// );
// return visitorData;
export async function getVisitorData(visitorId, requestId) {
  // Do not request Server API if provided data is obviously forged,
  // return an error instead.
  if (!visitorId || !requestId) {
    return { error: 'visitorId or requestId not provided.' };
  }

  const fingerprintJSProServerApiUrl = new URL(`https://api.fpjs.io/visitors/${visitorId}`);

  fingerprintJSProServerApiUrl.searchParams.append(
    'api_key',
    // In a real world use-case, we recommend using Auth-API-Key header instead: https://dev.fingerprint.com/docs/server-api#api-methods.
    // The API key should be stored in the environment variables/secrets.
    'F6gQ8H8vQLc7mVsVKaFx'
  );
  fingerprintJSProServerApiUrl.searchParams.append('request_id', requestId);

  const visitorServerApiResponse = await fetch(fingerprintJSProServerApiUrl.href);

  // If there's something wrong with provided data, Server API might return non 200 response.
  // We consider these data unreliable.
  if (visitorServerApiResponse.status !== 200) {
    return { error: 'Server API error.' };
  }

  return await visitorServerApiResponse.json();
}

export function getOkResponse(res, message, messageSeverity) {
  return res.status(200).json({ message, severity: messageSeverity });
}

export function getForbiddenResponse(res, message, messageSeverity) {
  return res.status(403).json({ message, severity: messageSeverity });
}

// Report suspicious user activity according to internal processes here.
// Possibly this action could also lock the user's account temporarily or ban a specific action.
export function reportSuspiciousActivity(context) {}

export function ensurePostRequest(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });

    return false;
  }

  return true;
}
