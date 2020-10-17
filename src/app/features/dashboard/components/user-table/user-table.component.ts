import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { appSettings } from '../../../../app.settings';
import { MockService } from '../../../../core/services';
import { IResponse, IUser } from '../../../../infrastructure/interface';
import { UserService } from '../../shared/services/user/user.service';
import { BroadcastService } from '../../../../core/services/broadcast/broadcast.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})

export class UserTableComponent implements OnInit, OnDestroy {
  public editing: { [key: number]: boolean };
  public userList: IUser[];
  public isLoading = false;
  public selected = [];

  private ngUnsubscribe: Subject<boolean> = new Subject();

  constructor(private toastService: ToastrService,
              private userService: UserService,
              private broadcastService: BroadcastService,
              private mockService: MockService) {
  }

  // =============== Angular Lifecycle ===============

  ngOnInit() {
    this.listenerInit();
    this.dataInit();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  // =============== Initialization ===============

  private dataInit(): void {
    this.editing = {};
    this.getUsers();
  }

  private listenerInit(): void {
    this.broadcastService.listenBroadCast();
    this.broadcastService.data
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        this.userList = res;
      });
  }

  // =============== Event handlers ===============

  public openEdit(i: number, column: string): void {
    this.editing[`${i}-${column}`] = true;
  }

  public updateData(event, data: IUser, i: number, column: string): void {
    this.updateUser(data);
    this.editing[`${i}-${column}`] = false;
    data[column] = event.target.value;
    this.broadcastService.broadCastMessage<IUser[]>(this.userList);
  }

  public onSelect({selected}): void {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  public onActivate(event): void {
  }

  public onRemove(): void {
    this.selected = [];
  }

  // =============== API Calls ===============

  private getUsers(): void {
    this.isLoading = true;
    this.mockService.getData<IUser[]>('users')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: IResponse<IUser[]>) => {
          if (res.status === appSettings.SUCCESS) {
            this.userList = res.data;
            this.isLoading = false;
          }
        },
        (err) => {
          this.toastService.error(err.message);
          this.isLoading = false;
        });
  }

  private updateUser(user: IUser): void {
    this.userService.updateUserByID(user.id, user)
      .subscribe((res: IResponse<boolean>) => {
          if (res.data) {
            this.toastService.success('User updated successfully');
            this.getUsers();
          }
        },
        (err) => this.toastService.error(err.error));
  }

}
