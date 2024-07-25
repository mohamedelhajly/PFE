import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TenderService } from '../tender.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-save-tender-modal',
  standalone: true,
  imports: [NzMessageModule , CommonModule ,NzFormModule, NzInputModule , ReactiveFormsModule ,NzSelectModule],
  templateUrl: './save-tender-modal.component.html',
  styleUrl: './save-tender-modal.component.css'
})
export class SaveTenderModalComponent  {
  tenderForm: FormGroup;
  sectors: {value: string, label: string}[] = [
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'industrie', label: 'Industrie' },
    { value: 'construction', label: 'Construction' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'transport', label: 'Transport et logistique' },
    { value: 'hotellerie_restauration', label: 'Hôtellerie et restauration' },
    { value: 'information_communication', label: 'Information et communication' },
    { value: 'finance_assurance', label: 'Finance et assurance' },
    { value: 'immobilier', label: 'Immobilier' },
    { value: 'services_entreprises', label: 'Services aux entreprises' }
  ];

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private tenderService: TenderService
  ) {
    this.tenderForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      budgetType: ['', Validators.required],
      operation: ['', Validators.required],
      situation: ['', Validators.required],
      prestation: ['', Validators.required],
      cautionPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      estimatedAmount: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      location: ['', Validators.required],
      sector: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.tenderService.uploadFile(file).subscribe(
        response => {
          this.tenderForm.patchValue({ image: response.fileKey });
        },
        error => {
          this.message.error('File upload failed');
        }
      );
    }
  }

  saveTender(): void {
    if (this.tenderForm.valid) {
      const tender: any = this.tenderForm.value;
      this.tenderService.saveTender(tender).subscribe(
        response => {
          this.message.success('Tender saved successfully');
          this.modalRef.close(true);
        },
        error => {
          this.message.error('Failed to save tender');
        }
      );
    } else {
      Object.values(this.tenderForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
