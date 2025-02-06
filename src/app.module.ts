import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: 'C:/Users/kasra/Downloads/Learning/Nest Project/hotel-booking-system/proto/auth.proto', 
          url: 'localhost:5001', 
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
