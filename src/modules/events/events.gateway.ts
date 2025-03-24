import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: 'edges' })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger();

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('events')
  public handleEvents(@MessageBody() data: unknown): WsResponse<unknown> {
    const event = 'events';
    return { event, data };
  }

  public handleConnection(client: Socket): any {
    client.join('01');
  }

  public handleDisconnect(client: Socket): any {
    client.leave('01');
  }
}
