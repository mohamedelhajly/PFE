import { CommonModule } from "@angular/common";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzMessageModule, NzMessageService } from "ng-zorro-antd/message";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTableModule } from "ng-zorro-antd/table";
import { TenderServiceService } from "../../../shared/tender-service.service";
import { UserService } from "../../../shared/user.service";
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
    selector:'app-lettre',
    templateUrl:'./lettre.component.html',
    styleUrls:['./lettre.component.css'],
    imports:[NzSelectModule, CommonModule,NzModalModule,NzMessageModule,NzTableModule , FormsModule,RouterModule,NzIconModule, NzListModule],
    standalone:true,
})
export class lettre implements OnInit{

    tenders: any[] = [];
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;
  sortField = 'createdAt';
  sortOrder = 'descend';
  rejectComment = '';
  @ViewChild('generateTpl') generateTpl!: TemplateRef<any>;

  isDocumentListVisible = false;
  documents = [
    { name: 'Avis.docx', path: 'assets/documents/1.doc' },
    { name: 'Lettre commission.docx', path: 'assets/documents/2.doc' },
    { name: 'Lettre Journal.docx', path: 'assets/documents/3.doc' },
    { name: 'Convocation.docx', path: 'assets/documents/4.doc' },
  ];

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
   const status = 'ACCEPTED';
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

//   updateStatus(tender: any, newStatus: 'ACCEPTED' | 'REJECTED', tpl: TemplateRef<{}>): void {
//     const isRejected = newStatus === 'REJECTED';

//     if (isRejected) {
//       this.showRejectModal(tender, tpl);
//     } else {
//       this.showAcceptModal(tender, tpl);
//     }
//   }

//   private showRejectModal(tender: any, tpl: TemplateRef<{}>): void {
//     this.modalService.confirm({
//       nzTitle: 'Reject Tender',
//       nzContent: tpl,
//       nzOnOk: () =>
//         new Promise<void>((resolve, reject) => {
//           if (!this.rejectComment.trim()) {
//             this.message.error('Please provide a reason for rejection');
//             reject();
//             return;
//           }
//           this.performStatusUpdate(tender, 'REJECTED', this.rejectComment, resolve, reject);
//         })
//     });
//   }

//   private showAcceptModal(tender: any, tpl: TemplateRef<{}>): void {
//     this.modalService.confirm({
//       nzTitle: 'Accept Tender',
//       nzContent: tpl,
//       nzOnOk: () =>
//         new Promise<void>((resolve, reject) => {
//           this.performStatusUpdate(tender, 'ACCEPTED', '', resolve, reject);
//         })
//     });
//   }

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

  showGenerateModal(tender: any): void {
    this.modalService.create({
      nzContent: this.generateTpl,
      nzOnOk: () => this.generateDocument(tender),
      nzWidth: 600, // Adjust this value as needed
    });
  }

  generateDocument(tender: any): void {
    // Implement the logic to generate the document
    console.log('Generating document for tender:', tender);
  }



  //hado dyal fichiers

  showDocumentList(tender: any): void {
    this.isDocumentListVisible = true;
  }

  handleCancel(): void {
    this.isDocumentListVisible = false;
  }

  downloadDocument(doc: any): void {
    const link = document.createElement('a');
    link.href = doc.path;
    link.download = doc.name;
    link.click();
  }


}