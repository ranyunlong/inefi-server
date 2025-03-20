import { Injectable } from '@nestjs/common';
import { Mail, MailHeaders } from 'mail';

@Injectable()
export class MailService {
  public async send(
    body: string,
    headers: Omit<MailHeaders, 'from'> & { from?: string },
  ) {
    return new Promise((resolve, reject) => {
      Mail({
        host: process.env.MAIL_HOST,
        username: process.env.MAIL_USER,
        password: process.env.MAIL_PWD,
      })
        .message({ ...headers, from: headers.from || process.env.MAIL_USER })
        .body(body)
        .send((err, message) => {
          if (err) {
            reject(err);
          } else {
            resolve(message);
          }
        });
    });
  }
}
