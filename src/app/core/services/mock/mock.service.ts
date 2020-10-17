import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IResponse } from '../../../infrastructure/interface';
import { getMockData } from '../../utils';

@Injectable(
  {providedIn: 'root'},
)

export class MockService {
  constructor() {
  }

  public getData<T>(data: string): Observable<IResponse<T>> {
    const resp: IResponse<T> = {
      data: getMockData<T>(data),
      status: 200,
      success: true,
    };

    return of(resp)
      .pipe(delay(3000));
  }

}
