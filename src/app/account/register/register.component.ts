import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, map, switchMap, take } from 'rxjs';

import { SharedModule } from '@shared/shared.module';

import { AccountService } from '../account.service';

@Component({
  selector: 'sc-register',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private passwordRegEx =
    "(?=^.{6,10}$)(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*s).*$";

  form = this._fb.group({
    displayName: ['', [Validators.required]],
    email: [
      '',
      [Validators.required, Validators.email],
      [this.validateEmailNotTaken()],
    ],
    password: [
      '',
      [Validators.required, Validators.pattern(this.passwordRegEx)],
    ],
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _accountService: AccountService,
    private readonly _router: Router
  ) {}

  handleSubmitSignUp() {
    this._accountService
      .register(this.form.value)
      .subscribe((x) => this._router.navigateByUrl('/shop'));
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl) =>
      control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() =>
          this._accountService
            .checkEmailExists(control.value)
            .pipe(map((x) => (x ? { emailExists: true } : null)))
        )
      );
  }
}
