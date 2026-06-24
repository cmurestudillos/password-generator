import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';
import packageJson from '../../package.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PasswordGeneratorComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public appVersion = '';
  public title = 'password-generator';

  public ngOnInit(): void {
    this.appVersion = packageJson.version;
  }
}
