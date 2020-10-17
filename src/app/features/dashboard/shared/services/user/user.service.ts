import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { IUser } from '../../../../../infrastructure/interface/features/dashboard';
import { Observable, of } from 'rxjs';
import { IResponse } from '../../../../../infrastructure/interface';

@Injectable()
export class UserService {

  constructor() {
  }

  private getUrl(url: string): string {
    return `${environment.serverUrl + url}`;
  }


  public getUserList(): Observable<IResponse<IUser[]>> {
    return of();
  }

  public updateUserByID(id: string, user: IUser): Observable<IResponse<boolean>> {
    return of();
  }

}
