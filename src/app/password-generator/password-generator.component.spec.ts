import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

import { PasswordGeneratorComponent } from './password-generator.component';

describe('PasswordGeneratorComponent', () => {
  let component: PasswordGeneratorComponent;
  let fixture: ComponentFixture<PasswordGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordGeneratorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a password with the requested length when at least one charset is selected', () => {
    component.passwordForm.patchValue({ length: 16 });

    component.generatePassword();

    expect(component.generatedPassword.length).toBe(16);
  });

  it('should only use digits when only "useNumbers" is selected', () => {
    component.passwordForm.patchValue({
      useUppercase: false,
      useLowercase: false,
      useNumbers: true,
      useSpecial: false,
      length: 10,
    });

    component.generatePassword();

    expect(component.generatedPassword).toMatch(/^[0-9]{10}$/);
  });

  it('should clamp the length to the allowed range (4-32)', () => {
    component.passwordForm.patchValue({ length: 999 });
    component.generatePassword();
    expect(component.generatedPassword.length).toBe(32);

    component.passwordForm.patchValue({ length: 0 });
    component.generatePassword();
    expect(component.generatedPassword.length).toBe(4);
  });

  it('should not generate a password and should warn the user when no charset is selected', () => {
    const snackBar = (component as unknown as { snackBar: MatSnackBar }).snackBar;
    const openSpy = spyOn(snackBar, 'open');

    component.passwordForm.patchValue({
      useUppercase: false,
      useLowercase: false,
      useNumbers: false,
      useSpecial: false,
    });

    component.generatePassword();

    expect(component.generatedPassword).toBe('');
    expect(component.passwordStrength).toBeNull();
    expect(openSpy).toHaveBeenCalledWith('Selecciona al menos un tipo de carácter', 'Cerrar', { duration: 3000 });
  });

  it('should report a higher strength for longer, more varied passwords', () => {
    component.passwordForm.patchValue({
      length: 24,
      useUppercase: true,
      useLowercase: true,
      useNumbers: true,
      useSpecial: true,
    });
    component.generatePassword();
    expect(component.passwordStrength?.level).toBe('very-strong');

    component.passwordForm.patchValue({
      length: 4,
      useUppercase: true,
      useLowercase: false,
      useNumbers: false,
      useSpecial: false,
    });
    component.generatePassword();
    expect(component.passwordStrength?.level).toBe('weak');
  });

  it('should copy the generated password to the clipboard and notify the user', () => {
    const clipboard = (component as unknown as { clipboard: Clipboard }).clipboard;
    const snackBar = (component as unknown as { snackBar: MatSnackBar }).snackBar;
    const copySpy = spyOn(clipboard, 'copy');
    const openSpy = spyOn(snackBar, 'open');

    component.generatePassword();
    component.copyPassword();

    expect(copySpy).toHaveBeenCalledWith(component.generatedPassword);
    expect(openSpy).toHaveBeenCalledWith('Contraseña copiada al portapapeles', 'Cerrar', { duration: 2000 });
  });

  it('should do nothing when trying to copy without a generated password', () => {
    const clipboard = (component as unknown as { clipboard: Clipboard }).clipboard;
    const copySpy = spyOn(clipboard, 'copy');

    component.copyPassword();

    expect(copySpy).not.toHaveBeenCalled();
  });
});
