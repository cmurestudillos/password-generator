import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIcon } from '@angular/material/icon';

const MIN_LENGTH = 4;
const MAX_LENGTH = 32;

export interface IPasswordStrength {
  label: string;
  percent: number;
  level: 'weak' | 'medium' | 'strong' | 'very-strong';
}

@Component({
  selector: 'app-password-generator',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIcon,
    ClipboardModule,
  ],
  templateUrl: './password-generator.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './password-generator.component.scss',
})
export class PasswordGeneratorComponent {
  public passwordForm: FormGroup;
  public generatedPassword = '';
  public passwordStrength: IPasswordStrength | null = null;
  public validCharacters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    special: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
  };

  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  private readonly clipboard = inject(Clipboard);

  constructor() {
    this.passwordForm = this.fb.group({
      length: [12, [Validators.required, Validators.min(MIN_LENGTH), Validators.max(MAX_LENGTH)]],
      useUppercase: [true],
      useLowercase: [true],
      useNumbers: [true],
      useSpecial: [true],
    });
  }

  public generatePassword(): void {
    const length = Math.min(Math.max(this.passwordForm.get('length')?.value ?? MIN_LENGTH, MIN_LENGTH), MAX_LENGTH);
    const useUppercase = this.passwordForm.get('useUppercase')?.value;
    const useLowercase = this.passwordForm.get('useLowercase')?.value;
    const useNumbers = this.passwordForm.get('useNumbers')?.value;
    const useSpecial = this.passwordForm.get('useSpecial')?.value;

    let charset = '';
    let varietyCount = 0;
    if (useUppercase) {
      charset += this.validCharacters.uppercase;
      varietyCount++;
    }
    if (useLowercase) {
      charset += this.validCharacters.lowercase;
      varietyCount++;
    }
    if (useNumbers) {
      charset += this.validCharacters.numbers;
      varietyCount++;
    }
    if (useSpecial) {
      charset += this.validCharacters.special;
      varietyCount++;
    }

    if (!charset) {
      this.generatedPassword = '';
      this.passwordStrength = null;
      this.snackBar.open('Selecciona al menos un tipo de carácter', 'Cerrar', { duration: 3000 });
      return;
    }

    this.generatedPassword = this.buildPassword(charset, length);
    this.passwordStrength = this.calculateStrength(varietyCount, length);
  }

  public copyPassword(): void {
    if (this.generatedPassword) {
      this.clipboard.copy(this.generatedPassword);
      this.snackBar.open('Contraseña copiada al portapapeles', 'Cerrar', {
        duration: 2000,
      });
    }
  }

  private buildPassword(charset: string, length: number): string {
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(randomValues[i] % charset.length);
    }
    return password;
  }

  private calculateStrength(varietyCount: number, length: number): IPasswordStrength {
    let score = varietyCount;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (length >= 20) score++;

    if (score <= 2) return { label: 'Muy débil', percent: 25, level: 'weak' };
    if (score <= 4) return { label: 'Media', percent: 50, level: 'medium' };
    if (score <= 6) return { label: 'Fuerte', percent: 75, level: 'strong' };
    return { label: 'Muy fuerte', percent: 100, level: 'very-strong' };
  }
}
