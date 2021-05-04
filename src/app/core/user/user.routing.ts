import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AirportComponent } from './airport/airport.component';
import { IdVisaComponent } from './id-visa/id-visa.component';
import { OthersComponent } from './others/others.component';
import { SecurityComponent } from './security/security.component';
import { TaxComponent } from './tax/tax.component';
import { VehicleComponent } from './vehicle/vehicle.component';

export const UserRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'id-visa',
                component: IdVisaComponent
            },
            {
                path: 'vehicle',
                component: VehicleComponent
            },
            {
                path: 'airport',
                component: AirportComponent
            },
            {
                path: 'tax',
                component: TaxComponent
            },
            {
                path: 'security',
                component: SecurityComponent
            },
            {
                path: 'others',
                component: OthersComponent
            }
        ]
    }
]