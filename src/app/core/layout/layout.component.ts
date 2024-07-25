import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserService } from '../../shared/user.service';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule , NzLayoutModule , RouterOutlet,NzMenuModule , RouterLink,RouterModule ,NzAvatarModule,NzDropDownModule,NzIconModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(private route:Router,private eRef: ElementRef, private user:UserService){}



  isDropdownOpen = false;
  userName = this.user?.currentUser?.fullName; // Replace with actual user name

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
  logout() {
    // Implement your logout logic here
    this.route.navigate(['/login']);
    this.isDropdownOpen = false; // Close dropdown after logout
  }
}
