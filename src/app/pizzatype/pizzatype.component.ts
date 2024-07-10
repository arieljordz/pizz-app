import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import 'datatables.net';
import 'datatables.net-bs5';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pizzatype',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DatePipe, FormsModule ],
  templateUrl: './pizzatype.component.html',
  styleUrl: './pizzatype.component.css'
})
export class PizzatypeComponent {

  pizzatypes: any[] = [];
  totalCount: number = 0;
  page: number = 1;
  pageSize: number = 10;

  apiservice = inject(ServiceService);

  ngOnInit(): void {
    this.loadPizzaTypes();
  }

  loadPizzaTypes(): void {
    this.apiservice
      .getPizzaTypes(this.page, this.pageSize)
      .subscribe((response: any) => {
        console.log(response);
        this.pizzatypes = response.data;
        this.totalCount = response.totalCount;
      });
  }

  onPrevious() {
    this.page --;
    this.loadPizzaTypes();
  }
  onNext() {
    this.page ++;
    this.loadPizzaTypes();
  }

  getAllPizzaTypes() {
    this.page = 1;
    this.pageSize = 10;
    this.loadPizzaTypes();
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

  importPizzaTypes() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const formData = new FormData();
      formData.append('file', file, file.name);

      this.apiservice.importFilePizzaTypes(formData).subscribe(
        (response) => {
          alert(response.errorMessage);
          // console.log('File import successful:', response);
          this.loadPizzaTypes();
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

