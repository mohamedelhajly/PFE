import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';


@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [NzModalModule ,CommonModule,NzMessageModule,NzFormModule , FormsModule,NzInputModule, NzIconModule],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent  implements OnInit {
  tenderId!: any;
  isModalVisible = false;
  data:any

  purchaseRequest:any = {
    id: '',
    cps: '',
    rc: '',
    da: '',
    estimation: ''
  };

  constructor(
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private message: NzMessageService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.tenderId = this.route.snapshot.paramMap.get('id');
    this.getTenderId()

  }

  showModal() {
    this.isModalVisible = true;
  }

  handleCancel() {
    this.isModalVisible = false;
  }

  getTenderId() {
    this.http.get('http://localhost:8200/api/tender/'+this.tenderId).subscribe({
      next: (response: any) => {
          this.data = response
      }
    })
  }

  async handleFileUpload(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response: any = await this.http.post('http://localhost:8200/api/storage', formData).toPromise();
        this.purchaseRequest[field] = response.fileKey;
        this.message.success(`${field} file uploaded successfully`);
      } catch (error) {
        this.message.error(`Failed to upload ${field} file`);
      }
    }
  }

  async submitForm() {
    try {
      const response = await this.http.post(`http://localhost:8200/api/purchase-request/save/${this.tenderId}`, this.purchaseRequest).toPromise();
      this.message.success('Purchase request submitted successfully');
      this.isModalVisible = false;
    } catch (error) {
      this.message.error('Failed to submit purchase request');
    }
  }
}
