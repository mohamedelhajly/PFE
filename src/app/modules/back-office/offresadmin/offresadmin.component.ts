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
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PurchaseRequestService } from './purchase-request.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-offresadmin',
  standalone: true,
  imports: [CommonModule,
    NzTagModule,FormsModule,NzCheckboxModule,
    NzSelectModule,NzFormModule,NzInputModule,CardComponent,NzTableModule, NzIconModule],
  templateUrl: './offresadmin.component.html',
  styleUrl: './offresadmin.component.css'
})
export class OffresadminComponent implements OnInit {
  listOfData: any[] = [];
  loading = true;
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  tenderId!: string;

  constructor(
    private route: ActivatedRoute,
    private purchaseRequestService: PurchaseRequestService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tenderId = params['id'];
      this.loadData();
    });
  }

  loadData(): void {
    this.loading = true;
    this.purchaseRequestService.getPurchaseRequests(this.tenderId, this.pageIndex - 1, this.pageSize).subscribe(
      (data: any) => {
        this.listOfData = data.content;
        this.total = data.totalElements;
        this.loading = false;
      },
      error => {
        this.message.error('Failed to load data');
        this.loading = false;
      }
    );
  }

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.loadData();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.loadData();
  }

  downloadFile(filename: string): void {
    this.purchaseRequestService.downloadFile(filename).subscribe(
      (blob: Blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      },
      error => {
        this.message.error('Failed to download file');
      }
    );
  }

  uploadFile(event: any, type: string): void {
    const file = event.target.files[0];
    if (file) {
      this.purchaseRequestService.uploadFile(file, type).subscribe(
        response => {
          this.message.success(`${type} uploaded successfully`);
          this.loadData();
        },
        error => {
          this.message.error(`Failed to upload ${type}`);
        }
      );
    }
  }

  triggerFileInput(inputId: string): void {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.click();
  }
}
