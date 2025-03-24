import { Global, Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Global()
@Module({
  providers: [EventsGateway],
})
export class EventsModule {}
