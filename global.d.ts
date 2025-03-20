/// <reference types="@types/node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly MAIL_HOST: string;
    readonly MAIL_USER: string;
    readonly MAIL_PWD: string;
  }
}

declare module 'mail' {
  declare interface MailInstance {
    message(headers: MailHeaders): MailInstance;
    body(text: string): MailInstance;
    send(callback: SendCallBack);
  }

  export interface MailOptions {
    host: string;
    username: string;
    password: string;
    secure?: boolean;
    port?: number;
    domain?: number;
    mimeTransport?: number;
  }

  declare type SendCallBack = (err?: Error, message: any) => void;

  export function Mail(opts: MailOptions): MailInstance;

  declare interface MailHeaders {
    from: string;
    to: string[];
    subject: string;
  }
}
