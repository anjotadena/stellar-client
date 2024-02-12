import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../account.service';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'sc-login',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoggingIn = signal(false);

  loginForm = this._fb.group({
    email: new FormControl('bob@test.com', [Validators.required, Validators.email]),
    password: new FormControl('Pa$$w0rd', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  returnUrl: string;

  private _destroyRef = inject(DestroyRef);

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _accountService: AccountService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
  ) {
    this.returnUrl =
      this._activatedRoute.snapshot.queryParamMap?.get('returnUrl') || '/shop';
  }

  handleSubmitLogin() {
    this.isLoggingIn.set(true);

    this._accountService
      .login(this.loginForm.value)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap(() => this.isLoggingIn.set(false))
      )
      .subscribe((_) => this._router.navigate(["/shop"]));
  }
}
