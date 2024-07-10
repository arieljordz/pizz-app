import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import 'datatables.net';
import 'datatables.net-bs5';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DatePipe, FormsModule ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {

  orders: any[] = [];
  totalCount: number = 0;
  page: number = 1;
  pageSize: number = 10;

  apiservice = inject(ServiceService);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.apiservice
      .getOrders(this.page, this.pageSize)
      .subscribe((response: any) => {
        console.log(response);
        console.log(response.totalCount);
        this.orders = response.data;
        this.totalCount = response.totalCount;
      });
  }

  onPrevious() {
    this.page --;
    this.loadOrders();
  }
  onNext() {
    this.page ++;
    this.loadOrders();
  }

  getAllOrders() {
    this.page = 1;
    this.pageSize = 10;
    this.loadOrders();
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

  importOrders() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const formData = new FormData();
      formData.append('file', file, file.name);

      this.apiservice.importFileOrders(formData).subscribe(
        (response) => {
          alert(response.errorMessage);
          // console.log('File import successful:', response);
          this.loadOrders();
          input.value = '';
        },
        (error) => {
          console.error('Error importing file:', error);
          input.value = '';
        }
      );
    }
  }
}
