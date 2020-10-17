import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FormBuilder, FormGroup } from '@angular/forms';
import { appSettings } from '../../../../app.settings';
import { MockService } from '../../../../core/services';
import { BroadcastService } from '../../../../core/services/broadcast/broadcast.service';
import { RequiredValidator } from '../../../../core/validations/required.validator';
import { IResponse, IUser } from '../../../../infrastructure/interface';
import { UserModel } from '../../../../infrastructure/model/features/dashboard';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})

export class UserTableComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public editing: { [key: number]: boolean };
  public userList: IUser[] = [];
  public isLoading = false;
  public selected = [];

  private ngUnsubscribe: Subject<boolean> = new Subject();

  constructor(private toastService: ToastrService,
              private userService: UserService,
              private fb: FormBuilder,
              private broadcastService: BroadcastService,
              private mockService: MockService) {
  }

  // =============== Angular Lifecycle ===============

  ngOnInit() {
    this.listenerInit();
    this.dataInit();
    this.initForm();
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

  private initForm(): void {
    this.form = this.fb.group({
      firstname: [null, [RequiredValidator.validate]],
      lastname: [null, [RequiredValidator.validate]],
      birthdate: [new Date(), [RequiredValidator.validate]],
    });
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

  public onDelete(): void {
    this.removeBulk();
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

  public resetForm(): void {
    this.form.reset();
  }

  // =============== API Calls ===============

  private getUsers(withUpdate: boolean = false): void {
    this.isLoading = true;
    this.mockService.getData<IUser[]>('users')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: IResponse<IUser[]>) => {
          if (res.status === appSettings.SUCCESS) {
            if (this.userList && this.userList.length) {
              this.userList = [...this.userList, ...res.data];
            } else {
              this.userList = [...res.data];
            }
            if (withUpdate) {
              this.broadcastService.broadCastMessage<IUser[]>(this.userList);
            }
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

  public addToTable() {
    this.isLoading = true;
    const dateString = this.dateConvert(this.form.get('birthdate').value);
    const user = new UserModel({...this.form.value, birthdate: dateString});
    this.userService.addUser(user)
      .subscribe(
        () => {
          this.userList = [user];
          this.getUsers(true);
        },
        (err) => {
          this.toastService.error(err.error);
          this.isLoading = false;
        },
      );
  }

  public removeBulk(): void {
    this.isLoading = true;
    const selectedIds = this.selected.map((i) => i.id);
    this.userService.removeUsers(selectedIds)
      .subscribe(
        (res) => {
          this.isLoading = true;
          this.toastService.success('User successfully deleted');
          this.userList = this.userList.filter((i) => !selectedIds.includes(i.id));
          this.broadcastService.broadCastMessage<IUser[]>(this.userList);
        },
        (err) => {
          this.toastService.error(err.error);
          this.isLoading = false;
        },
      );
  }

// =============== Helper functions ===============

  private dateConvert(date: { year: number, month: number, day: number }): string {
    return new Date(date.year, date.month - 1, date.day).toUTCString();
  }

}
