import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router, RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-dashbord-layout',
  standalone: true,
  imports: [CommonModule , NzLayoutModule , RouterOutlet,NzMenuModule , RouterLink ,NzIconModule ,RouterModule],
  templateUrl: './dashbord-layout.component.html',
  styleUrl: './dashbord-layout.component.css'
})
export class DashbordLayoutComponent {
  isCollapsed = false;
  user:any
  constructor(private userService:UserService,private router:Router){
    this.user=this.userService.currentUser
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      // Optional: Provide user feedback
      console.log('Copied to clipboard');
      // You could also set a property to show a temporary message in the UI
      // this.showCopiedMessage = true;
      // setTimeout(() => this.showCopiedMessage = false, 2000);
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }
}
