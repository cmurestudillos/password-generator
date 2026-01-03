import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';
import { version } from '../../package.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PasswordGeneratorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  appVersion: string = '';
  title = 'password-generator';

  ngOnInit() {
    this.appVersion = version;
  }
}
