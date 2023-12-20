import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../account.service';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sc-login',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this._fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  returnUrl: string;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _accountService: AccountService,
    private readonly _activatedRoute: ActivatedRoute
  ) {
    this.returnUrl = this._activatedRoute.snapshot.queryParamMap?.get("returnUrl") || '/shop';
  }

  handleSubmitLogin() {
    this._accountService.login(this.loginForm.value).subscribe((response) => {
      console.log(response);
    });
  }
}
