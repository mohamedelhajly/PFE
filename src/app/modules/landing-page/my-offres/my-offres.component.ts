import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../../shared/shared-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CardOffreComponent } from "../../../shared/components/card-offre/card-offre.component";

@Component({
  selector: 'app-my-offres',
  standalone: true,
  imports: [CommonModule,
    NzTagModule, FormsModule, NzCheckboxModule,
    NzSelectModule, NzFormModule, NzInputModule, CardComponent, CardOffreComponent],
  templateUrl: './my-offres.component.html',
  styleUrl: './my-offres.component.css'
})
export class MyOffresComponent implements OnInit {

  tenders: any[] = [];
  page: number = 0;
  totalPages: number = 1;
  loading: boolean = false;
  payload = {
    status: null
  };

    constructor(private sharedServiceService:SharedServiceService) {}

    ngOnInit() {
      this.loadData();
    }

  onTagChange(sector: any, checked: boolean) {
    sector.selected = checked;
  }


  loadData() {
    if (this.loading) return;
    this.loading = true;

    this.sharedServiceService.getTenders2(this.page, 10, this.payload).subscribe(
      (      data: { content: any; totalPages: number; }) => {
        this.tenders = [...this.tenders, ...data.content];
        this.totalPages = data.totalPages;
        this.loading = false;
      },
      (      error: any) => {
        console.error('Error fetching tenders', error);
        this.loading = false;
      }
    );
  }

  // @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {

    const element = event.target;

    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 1;

    if (atBottom && !this.loading && this.page < this.totalPages - 1) {
      this.page++;
      this.loadData();
    }
  }
}
