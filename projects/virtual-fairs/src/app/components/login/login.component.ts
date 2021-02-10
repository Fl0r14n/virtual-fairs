import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SocketService} from '../../services/socket.service';
import {SocketCall, SocketEvent} from '../../models';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'login',
  template: `
    <form [formGroup]="form" (submit)="submit()">
      <mat-card>
        <mat-card-title fxLayoutAlign="center">Login</mat-card-title>
        <mat-card-content>
          <p>
            <mat-icon>mail_outline</mat-icon>
            <mat-form-field>
              <input type="email" matInput placeholder="email" formControlName="email">
              <mat-error>
                Please provide a valid email address
              </mat-error>
            </mat-form-field>
          </p>
          <p>
            <mat-icon>password</mat-icon>
            <mat-form-field>
              <input type="password" matInput placeholder="password" formControlName="password">
              <mat-error>
                Please provide a valid email password
              </mat-error>
            </mat-form-field>
          </p>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-button type="submit" [disabled]="!form.valid">Login</button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
  styles: [`
    .mat-form-field {
      min-width: 300px;
      margin-right: 10px;
      margin-left: 10px;
    }
  `],
})
export class LoginComponent implements OnDestroy {

  form: FormGroup;
  subscription: any;

  constructor(private socketService: SocketService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.minLength(6)])
    });
    this.subscription = this.socketService.from$<boolean>(SocketEvent.AUTHORIZATION).subscribe(authorized => {
      if (authorized) {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'];
        returnUrl ? this.router.navigateByUrl(returnUrl) : this.router.navigate(['/room']);
      } else {
        this.snackBar.open('Login error', null, {duration: 2000})
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const {email, password} = this.form.controls;
    this.socketService.to(SocketCall.LOGIN, email.value, password.value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription = undefined;
  }
}
