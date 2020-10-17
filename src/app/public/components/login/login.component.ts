import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { EmailValidator } from '../../../core/validations/email.validator';
import { RequiredValidator } from '../../../core/validations/required.validator';
import { LoginModel } from '../../../infrastructure/model/public';
import { AuthenticationService } from '../../../core/services/auth';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public submitted: boolean;
  public loading: boolean;
  public loginIsInvalid: boolean;
  public passwordInputType: 'password' | 'text' = 'password';

  private ngUnsubscribe: Subject<boolean> = new Subject();

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  constructor(private elementRef: ElementRef,
              private auth: AuthenticationService,
              private toast: ToastrService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private route: Router) {
  }

  // =============== Angular Lifecycle ===============

  ngOnInit() {
    this.passwordInputType = 'password';
    this.formInit();
    this.onChange();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  // =============== Event handlers ===============

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const data = new LoginModel(
      {
        ...this.form.value,
      },
    );
    this.submitted = true;
    this.loading = true;
    this.auth.login(data)
      .then((res) => {
          const queryParam = this.activatedRoute.snapshot.queryParamMap.get('redirectUrl');
          if (queryParam) {
            const url = decodeURI(queryParam);
            this.navigateToQueryParam(url);
          } else {
            this.route.navigate(['/dashboard']);
          }
        },
      )
      .catch((res) => {
        this.loginIsInvalid = true;
        this.toast.error('Wrong password/email', 'Try again');
        this.form.setErrors({wrongCredentials: true});
        },
      );
  }

// =============== Form handler ===============

  private formInit(): void {
    this.form = this.fb.group({
      email: ['', [RequiredValidator.validate, EmailValidator.validate]],
      password: ['', [RequiredValidator.validate]],
    });
  }

  private onChange() {
    this.form.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe(
        () => {
          if (this.loginIsInvalid) {
            this.loginIsInvalid = false;
            this.form.setErrors(null);
          }
        });
  }

  // =============== Helper Functions ===============

  // To be able to go back if redirect url also contains query param
  private navigateToQueryParam(url: string): void {
    const queryParamsIndex = url.indexOf('?');
    if (queryParamsIndex !== -1) {
      const query = url.substring(queryParamsIndex + 1).split('=');
      const route = url.slice(0, queryParamsIndex);
      this.route.navigate([route], {queryParams: {[query[0]]: [query[1]]}});
    } else {
      this.route.navigate([url]);
    }
  }


}
