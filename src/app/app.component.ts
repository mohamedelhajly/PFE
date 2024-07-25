import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NzNotificationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'offre-appel-pfe';
}
