import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TenderService } from '../tender.service';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UserService } from '../../../shared/user.service';
import { TenderServiceService } from '../../../shared/tender-service.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-offers-decline',
  standalone: true,
  imports: [NzSelectModule, CommonModule,NzModalModule,NzMessageModule,NzTableModule , FormsModule,RouterModule,NzIconModule],
  templateUrl: './offers-decline.component.html',
  styleUrl: './offers-decline.component.css'
})
export class OffersDeclineComponent implements OnInit {
  tenders: any[] = [];
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;
  sortField = 'createdAt';
  sortOrder = 'descend';
  rejectComment = '';

  constructor(
    private tenderService: TenderServiceService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadTenders();
  }

  loadTenders(): void {
   const status = 'REJECTED';
    this.loading = true;
    this.tenderService.getTenders(
      this.pageIndex - 1,
      this.pageSize,
      this.userService.currentUser.company.id,
      {
        status
      }
    ).subscribe(
      (response: any) => {
        this.tenders = response.content;
        this.total = response.totalElements;
        this.loading = false;
      },
      (error: any) => {
        this.message.error('Failed to load tenders');
        this.loading = false;
      }
    );
  }

  onQueryParamsChange(params: any): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item: any) => item.value !== null);
    this.sortField = (currentSort && currentSort.key) || 'createdAt';
    this.sortOrder = (currentSort && currentSort.value) || 'descend';
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadTenders();
  }

  updateStatus(tender: any, newStatus: 'ACCEPTED' | 'REJECTED', tpl: TemplateRef<{}>): void {
    const isRejected = newStatus === 'REJECTED';

    if (isRejected) {
      this.showRejectModal(tender, tpl);
    } else {
      this.showAcceptModal(tender, tpl);
    }
  }

  private showRejectModal(tender: any, tpl: TemplateRef<{}>): void {
    this.modalService.confirm({
      nzTitle: 'Reject Tender',
      nzContent: tpl,
      nzOnOk: () =>
        new Promise<void>((resolve, reject) => {
          if (!this.rejectComment.trim()) {
            this.message.error('Please provide a reason for rejection');
            reject();
            return;
          }
          this.performStatusUpdate(tender, 'REJECTED', this.rejectComment, resolve, reject);
        })
    });
  }

  private showAcceptModal(tender: any, tpl: TemplateRef<{}>): void {
    this.modalService.confirm({
      nzTitle: 'Accept Tender',
      nzContent: tpl,
      nzOnOk: () =>
        new Promise<void>((resolve, reject) => {
          this.performStatusUpdate(tender, 'ACCEPTED', '', resolve, reject);
        })
    });
  }

  private performStatusUpdate(tender: any, status: 'ACCEPTED' | 'REJECTED', comment: string, resolve: () => void, reject: () => void): void {
    this.tenderService.updateStatus({
      id: tender.id,
      status: status,
      comment: comment
    }).subscribe(
      () => {
        this.message.success(`Tender ${status.toLowerCase()} successfully`);
        this.loadTenders();
        this.rejectComment = ''; // Clear the comment after successful update
        resolve();
      },
      error => {
        this.message.error(`Failed to ${status.toLowerCase()} tender`);
        reject();
      }
    );
  }
}

