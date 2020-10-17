import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocalService } from '../local';

@Injectable({
  providedIn: 'root',
})

export class SharedService {
  private store: { [key: string]: any } = {};
  public permissionSubject = new BehaviorSubject(null);

  constructor(private localService: LocalService) {
  }

  public setData(data: any, key: string) {
    this.store[key] = data;
  }

  public getData<T>(key: string): T {
    return this.store[key];
  }

  public clearAllStore(): void {
    this.store = {};
  }

  public clearPermissions(): void {
    this.permissionSubject.next(null);
  }
}
