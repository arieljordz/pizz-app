import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orderdetails',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DatePipe, FormsModule ],
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.css',
})
export class OrderdetailsComponent {
  
  orders: any[] = [];
  totalCount: number = 0;
  page: number = 1;
  pageSize: number = 10;

  apiservice = inject(ServiceService);

  ngOnInit(): void {
    this.loadOrderDetails();
  }

  loadOrderDetails(): void {
    this.apiservice
      .getOrderDetails(this.page, this.pageSize)
      .subscribe((response: any) => {
        console.log(response.totalCount);
        this.orders = response.data;
        this.totalCount = response.totalCount;
      });
  }
  
  onPrevious() {
    this.page --;
    this.loadOrderDetails();
  }
  onNext() {
    this.page ++;
    this.loadOrderDetails();
  }

  getAllOrderDetails() {
    this.page = 1;
    this.pageSize = 10;
    this.loadOrderDetails();
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

  importOrderDetails() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const formData = new FormData();
      formData.append('file', file, file.name);

      this.apiservice.importFileOrderDetails(formData).subscribe(
        (response) => {
          alert(response.errorMessage);
          // console.log('File import successful:', response);
          this.loadOrderDetails();
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
