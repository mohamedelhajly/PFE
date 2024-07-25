import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NonNullableFormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/user.service';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NzIconModule ,NzDropDownModule ,NzFormModule ,NzInputModule ,FormsModule ,ReactiveFormsModule ,NzButtonModule ,NzCheckboxModule,NzRadioModule,NzSelectModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  isRegistering = false;
  showPassword = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    localStorage.clear()
  }

  validateLoginForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  validateRegisterForm: FormGroup = this.fb.group({
    userType: ['User'],
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    avatar: ['', []],
    phoneNumber: ['', []],
    companyName: [''],
    companyAddress: [''],
    companyRole: [''],
    companyType: [''],
    companySize: [''],
    companyId: ['']
  });

  toggleForm(): void {
    this.isRegistering = !this.isRegistering;
  }

  submitLoginForm(): void {
    if (this.validateLoginForm.valid) {
      const { userName, password } = this.validateLoginForm.value;
      this.http.post('http://localhost:8200/api/auth/login', {
        email: userName,
        password: password
      }).subscribe(
        (response: any) => {
          const token = response.accessToken;
          localStorage.setItem('accessToken', token);
          this.userService.getCurrentUser().subscribe({
            next: (res) => {
              if (res.role=='DTI') {
                this.router.navigate(['/dashboard/all']);
              }else if (res.role=="CDP"){
                this.router.navigate(['/dashboard']);
              }
              else{

                this.router.navigate(['/home']);
              }
            }
          })

        },
        (error) => {
          console.error('Login error', error);
        }
      );
    } else {
      Object.values(this.validateLoginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submitRegisterForm(): void {
    if (this.validateRegisterForm.valid) {
      const formValue = this.validateRegisterForm.value;
      let payload: any = {
        fullName: formValue.fullName,
        email: formValue.email,
        password: formValue.password,
        confirmPassword: formValue.confirmPassword,
        avatar: formValue.avatar,
        phoneNumber: formValue.phoneNumber
      };

      switch (formValue.userType) {
        case 'DTI':
          payload = {
            ...payload,
            role: 'DTI',
            company: {
              name: formValue.companyName,
              address: formValue.companyAddress,
              role: formValue.companyRole,
              companyType: formValue.companyType,
              companySize: formValue.companySize
            }
          };
          break;
        case 'CDP':
          payload = {
            ...payload,
            role: 'CDP',
            companyId: formValue.companyId
          };
          break;
        default:
          // User type, no additional fields needed
          break;
      }

      this.http.post('http://localhost:8200/api/auth/sign-up', payload).subscribe(
        (response: any) => {
          this.toggleForm(); // Switch back to login form after successful registration
        },
        (error) => {
          console.error('Registration error', error);
        }
      );
    } else {
      Object.values(this.validateRegisterForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  changeUserType(type: string): void {
    this.validateRegisterForm.patchValue({
      userType: type
    });

    // Reset form fields
    this.validateRegisterForm.patchValue({
      companyName: '',
      companyAddress: '',
      companyRole: '',
      companyType: '',
      companySize: '',
      companyId: ''
    });

    // Add or remove validators based on user type
    if (type === 'DTI') {
      this.validateRegisterForm.get('companyName')?.setValidators([Validators.required]);
      this.validateRegisterForm.get('companyAddress')?.setValidators([Validators.required]);
      this.validateRegisterForm.get('companyRole')?.setValidators([Validators.required]);
      this.validateRegisterForm.get('companyType')?.setValidators([Validators.required]);
      this.validateRegisterForm.get('companySize')?.setValidators([Validators.required]);
      this.validateRegisterForm.get('companyId')?.clearValidators();
    } else if (type === 'CDP') {
      this.validateRegisterForm.get('companyId')?.setValidators([Validators.required]);
      this.validateRegisterForm.get('companyName')?.clearValidators();
      this.validateRegisterForm.get('companyAddress')?.clearValidators();
      this.validateRegisterForm.get('companyRole')?.clearValidators();
      this.validateRegisterForm.get('companyType')?.clearValidators();
      this.validateRegisterForm.get('companySize')?.clearValidators();
    } else {
      // User type
      this.validateRegisterForm.get('companyName')?.clearValidators();
      this.validateRegisterForm.get('companyAddress')?.clearValidators();
      this.validateRegisterForm.get('companyRole')?.clearValidators();
      this.validateRegisterForm.get('companyType')?.clearValidators();
      this.validateRegisterForm.get('companySize')?.clearValidators();
      this.validateRegisterForm.get('companyId')?.clearValidators();
    }

    // Update form control validity
    this.validateRegisterForm.updateValueAndValidity();
  }
}
