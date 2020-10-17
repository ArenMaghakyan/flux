import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { IUser } from '../../../infrastructure/interface/features/dashboard';

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  private broadcastChannel = new BroadcastChannel('user-data');

  public data: BehaviorSubject<IUser[]> = new BehaviorSubject(null);

  constructor() {
  }

  public broadCastMessage<T>(message: T): void {
    this.broadcastChannel.postMessage(message);
  }

  public listenBroadCast(): void {
    this.broadcastChannel.onmessage = (message) => {
      this.data.next(message.data);
    };
  }
}
