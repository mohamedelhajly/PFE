import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-card-offre',
  standalone: true,
  imports: [CommonModule,NzIconModule,RouterLink],
  templateUrl: './card-offre.component.html',
  styleUrl: './card-offre.component.css'
})
export class CardOffreComponent {
  @Input() tender:any
  constructor(){
    console.log(this.tender);

  }
}
