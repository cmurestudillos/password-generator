import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-password-generator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIcon,
    ClipboardModule
  ],
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.scss'
})
export class PasswordGeneratorComponent {
  passwordForm: FormGroup;
  generatedPassword: string = '';
  validCharacters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    special: '!@#$%^&*()_+~`|}{[]:;?><,./-='
  };

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private clipboard: Clipboard
  ) {
    this.passwordForm = this.fb.group({
      length: [12],
      useUppercase: [true],
      useLowercase: [true],
      useNumbers: [true],
      useSpecial: [true]
    });
  }

  generatePassword() {
    const length = this.passwordForm.get('length')?.value;
    const useUppercase = this.passwordForm.get('useUppercase')?.value;
    const useLowercase = this.passwordForm.get('useLowercase')?.value;
    const useNumbers = this.passwordForm.get('useNumbers')?.value;
    const useSpecial = this.passwordForm.get('useSpecial')?.value;

    let charset = '';
    if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) charset += '0123456789';
    if (useSpecial) charset += '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    this.generatedPassword = password;
  }

  copyPassword() {
    if (this.generatedPassword) {
      this.clipboard.copy(this.generatedPassword);
      this.snackBar.open('Contraseña copiada al portapapeles', 'Cerrar', {
        duration: 2000,
      });
    }
  }
}
