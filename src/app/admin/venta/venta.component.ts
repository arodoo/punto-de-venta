import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Producto {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css'
})
export class VentaComponent {
  ventaForm: FormGroup;
  listaProductos: Producto[] = [
    {id: 1, nombre: 'Producto 1'},
    {id: 2, nombre: 'Producto 2'},
  ];

  constructor(private fb: FormBuilder,private http: HttpClient) {
    this.ventaForm = this.fb.group({
      productos: this.fb.array([this.crearProducto()])
    });
  }

  get productos() {
    return this.ventaForm.get('productos') as FormArray;
  }

  crearProducto(): FormGroup {
    return this.fb.group({
      producto: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  agregarProducto() {
    this.productos.push(this.crearProducto());
  }

  onSubmit() {
        if (this.ventaForm.valid) {
      const formData = this.ventaForm.value;
      this.http.post('http://localhost:8080/api/v1/Venta', formData).subscribe(
        (response) => {
          console.log('Datos enviados con éxito:', response);
         
        },
        (error) => {
          console.error('Error al enviar los datos:', error);
          
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
