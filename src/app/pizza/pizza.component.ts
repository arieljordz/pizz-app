import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import 'datatables.net';
import 'datatables.net-bs5';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pizza',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DatePipe, FormsModule ],
  templateUrl: './pizza.component.html',
  styleUrl: './pizza.component.css'
})
export class PizzaComponent implements OnInit {

  pizzas: any[] = [];
  totalCount: number = 0;
  page: number = 1;
  pageSize: number = 10;

  apiservice = inject(ServiceService);

  ngOnInit(): void {
    this.loadPizzas();
  }

  loadPizzas(): void {
    this.apiservice
      .getPizzas(this.page, this.pageSize)
      .subscribe((response: any) => {
        console.log(response);
        this.pizzas = response.data;
        this.totalCount = response.totalCount;
      });
  }

  onPrevious() {
    this.page --;
    this.loadPizzas();
  }
  onNext() {
    this.page ++;
    this.loadPizzas();
  }

  getAllPizzas() {
    this.page = 1;
    this.pageSize = 10;
    this.loadPizzas();
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

  importPizzas() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const formData = new FormData();
      formData.append('file', file, file.name);

      this.apiservice.importFilePizzas(formData).subscribe(
        (response) => {
          alert(response.errorMessage);
          // console.log('File import successful:', response);
          this.loadPizzas();
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

