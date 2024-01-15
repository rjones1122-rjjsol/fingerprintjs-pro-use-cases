import { NextApiRequest, NextApiResponse } from 'next';
import { BotVisit, saveBotVisit } from '../../../server/botd-firewall/botVisitDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse<BotVisit[]>) {
  try {
    const ip = req.query.ip;
    saveBotVisit(
      {
        ip: ip as string,
        requestId: 'test',
        bot: {
          result: 'bad',
          type: 'test',
        },
        time: Date.now().toString(),
        url: 'test',
        userAgent: 'test',
      },
      'test',
    );
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.statusMessage = `Something went wrong ${error}`;
    return res.status(500).end();
  }
}
