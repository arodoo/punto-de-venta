import { Routes } from '@angular/router';
import { EmpleadosComponent } from './admin/empleados/empleados.component';
import { ProductosComponent } from './admin/productos/productos.component';
import { VentaComponent } from './admin/venta/venta.component';

export const routes: Routes = [
    { path: "empleados", component: EmpleadosComponent},
    { path: "productos", component: ProductosComponent},
    { path: "venta", component: VentaComponent},
];
