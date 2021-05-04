import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementAuditComponent } from './management-audit/management-audit.component';
import { ManagementUserComponent } from './management-user/management-user.component';
import { ReportComponent } from './report/report.component';
import { IdVisaComponent } from './id-visa/id-visa.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AirportComponent } from './airport/airport.component';
import { TaxComponent } from './tax/tax.component';
import { OthersComponent } from './others/others.component';
import { SecurityComponent } from './security/security.component';
import { ReferencesComponent } from './references/references.component';
import { DiplomaticConsularComponent } from './diplomatic-consular/diplomatic-consular.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'id-visa',
                children: [
                    {
                        path: 'id-visa',
                        component: IdVisaComponent
                    },
                    {
                        path: 'diplomatic-consular',
                        component: DiplomaticConsularComponent
                    }
                ]
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
                path: 'others',
                component: OthersComponent
            },
            {
                path: 'security',
                component: SecurityComponent
            },
            {
                path: 'references',
                component: ReferencesComponent
            },
            {
                path: 'management',
                children: [
                    {
                        path: 'audit-trails',
                        component: ManagementAuditComponent
                    },
                    {
                        path: 'user',
                        component: ManagementUserComponent
                    }
                ]
            },
            {
                path: 'report',
                component: ReportComponent
            }
        ]
    }
]