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
    selector:'app-contact',
    templateUrl:'./contact.component.html',
    styleUrls:['./contact.component.css'],
    imports:[NzSelectModule, CommonModule,NzModalModule,NzMessageModule,NzTableModule , FormsModule,RouterModule,NzIconModule, NzListModule],
    standalone:true,
})

export class ContactComponent implements OnInit{
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}
