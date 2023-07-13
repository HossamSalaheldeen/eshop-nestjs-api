import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from "./entities/user.entity";
import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";

@Injectable({
  scope: Scope.REQUEST,
})
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(@Inject(REQUEST) private request: any) {
    // dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    // console.log(this.request.user);
    console.log(`BEFORE USER INSERTED: `, event.entity);
  }
}