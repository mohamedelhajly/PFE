import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { SaveTenderModalComponent } from '../save-tender-modal/save-tender-modal.component';
import { TenderService } from '../tender.service';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { TenderServiceService } from '../../../shared/tender-service.service';
import { UserService } from '../../../shared/user.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [NzTableModule , CommonModule ,NzModalModule,NzSelectModule ,FormsModule,RouterModule,NzIconModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit {
  status:any="PENDING"
  tenders: any[] = [];
  total = 0;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  sortField = 'acceptedAt';
  sortOrder = 'descend';

  constructor(
    private tenderService: TenderService,
    private tendersService: TenderServiceService,
    private modalService: NzModalService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadTenders();
  }

  onStatusChange(): void {
    this.loadTenders();
  }

  loadTenders(params: any = {
    pageIndex: this.pageIndex,
    pageSize: this.pageSize,
    sort: [{ key: this.sortField, value: this.sortOrder }]
  }): void {
    const status = '';
    this.loading = true;
    const criteria: any = {}; // Add criteria if needed

    this.tendersService.getTenders(
      this.pageIndex - 1,
      this.pageSize,
      this.userService.currentUser.company.id,
      {status:this.status},
    ).subscribe((response: any) => {
      this.loading = false;
      this.tenders = response.content;
      this.total = response.totalElements;
    });
  }



  onQueryParamsChange(params: any): void {
    this.pageIndex = params.pageIndex;
    this.pageSize = params.pageSize;
    this.sortField = params.sort[0].key;
    this.sortOrder = params.sort[0].value;
    this.loadTenders(params);
  }

  showSaveTenderModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Enregistrer un offere',
      nzContent: SaveTenderModalComponent,
      nzFooter: null,
      nzWidth: 800
    });

    modal.afterClose.subscribe((result:any) => {
      if (result) {
        this.loadTenders();
      }
    });
  }
}
