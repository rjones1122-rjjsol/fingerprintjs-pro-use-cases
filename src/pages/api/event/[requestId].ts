import { NextApiRequest, NextApiResponse } from 'next';
import { LOCAL_ENDPOINTS, SERVER_API_KEY } from '../../../server/const';

export default async function getFingerprintEvent(req: NextApiRequest, res: NextApiResponse) {
  const { requestId } = req.query as { requestId: string };


  const response = await fetch(`${LOCAL_ENDPOINTS}/events/${requestId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Auth-API-Key': SERVER_API_KEY
    },
  });

  const responseStatus = response.status;
  if (responseStatus !== 200) {
    throw new Error('Invalid Server API Rquest for the events endpoint.');
  }
  const responseJson = await response.json();
  res.status(200).json(responseJson);
}
