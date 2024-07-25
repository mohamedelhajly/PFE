import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CardComponent } from '../../../shared/components/card/card.component';
import { SharedServiceService } from '../../../shared/shared-service.service';
interface CompanySector {
  name: string;
  selected: boolean;
}
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,
    NzTagModule,FormsModule,NzCheckboxModule,
    NzSelectModule,NzFormModule,NzInputModule,CardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  companySectors: CompanySector[] = [
    { name: 'agriculture', selected: false },
    { name: 'industrie', selected: false },
    { name: 'construction', selected: false },
    { name: 'transport', selected: false },
    { name: 'hotellerie_restauration', selected: false },
    { name: 'information_communication', selected: false },
    { name: 'finance_assurance', selected: false },
    { name: 'immobilier', selected: false },
    { name: 'services_entreprises', selected: false },
    { name: 'commerce', selected: false },
  ];
  tenders: any[] = [];
  page: number = 0;
  totalPages: number = 1;
  loading: boolean = false;
  payload: any = {
    location: null,
    sectors: null,
    status: null
  };

  constructor(
    private sharedServiceService: SharedServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadData(this.payload);
  }

  onTagChange(sector: CompanySector, checked: boolean) {
    sector.selected = checked;
  }

  showMatches() {
    const selectedSectors = this.companySectors
      .filter(sector => sector.selected)
      .map(sector => sector.name);
    console.log('Selected sectors:', selectedSectors);
    this.payload.sectors = selectedSectors;
    this.page = 0; // Reset page number
    this.tenders = []; // Clear existing tenders
    this.loadData(this.payload);
  }

  clearAllFilters() {
    // Clear company sectors
    this.companySectors.forEach(sector => sector.selected = false);
    this.payload = {
      location: null,
      sectors: null,
      status: null
    };
    this.page = 0;
    this.tenders = [];
    this.loadData(this.payload);
  }

  loadData(payload: any) {
    if (this.loading) return;
    this.loading = true;

    this.sharedServiceService.getTenders(this.page, 5, payload).subscribe(
      data => {
        if (this.page === 0) {
          this.tenders = data.content; // Replace tenders if it's the first page
        } else {
          this.tenders = [...this.tenders, ...data.content]; // Append for subsequent pages
        }
        this.totalPages = data.totalPages;
        this.loading = false;
        this.cdr.detectChanges(); // Trigger change detection
      },
      error => {
        console.error('Error fetching tenders', error);
        this.loading = false;
        this.cdr.detectChanges(); // Trigger change detection
      }
    );
  }

  onScroll(event: any) {
    const element = event.target;
    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 1;

    if (atBottom && !this.loading && this.page < this.totalPages - 1) {
      this.page++;
      this.loadData(this.payload);
    }
  }
}
