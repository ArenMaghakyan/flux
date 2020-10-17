import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { IResponse } from '../../../../../infrastructure/interface';
import { IUser } from '../../../../../infrastructure/interface/features/dashboard';

@Injectable()
export class UserService {

  constructor() {
  }

  private getUrl(url: string): string {
    return `${environment.serverUrl + url}`;
  }

  public removeUsers(ids: string[]): Observable<IResponse<string[]>> {
    return of({
      data: ids,
      status: 200,
      success: true,
    });
  }

  public getUserList(): Observable<IResponse<IUser[]>> {
    return of();
  }

  public updateUserByID(id: string, user: IUser): Observable<IResponse<boolean>> {
    return of();
  }

  public addUser(user: IUser): Observable<IResponse<IUser>> {
    return of({
      data: user,
      status: 200,
      success: true,
    });
  }

}
