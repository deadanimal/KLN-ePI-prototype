export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    isCollapsed?: boolean;
    isCollapsing?: any;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    type?: string;
    collapse?: string;
    children?: ChildrenItems2[];
    isCollapsed?: boolean;
}
export interface ChildrenItems2 {
    path?: string;
    title?: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-home text-default'
  },
  {
    path: '/admin/id-visa',
    title: 'Identification & Visa',
    type: 'sub',
    icontype: 'fas fa-address-card text-default',
    collapse: 'id-visa',
    isCollapsed: true,
    children: [
      { path: 'id-visa', title: 'Application', type: 'link' },
      { path: 'diplomatic-consular', title: 'List of Diplomatic & Consular', type: 'link' }
    ]
  },
  // {
  //   path: '/admin/id-visa',
  //   title: 'Identification & Visa',
  //   type: 'link',
  //   icontype: 'fas fa-address-card text-purple'
  // },
  {
    path: '/admin/vehicle',
    title: 'Vehicle',
    type: 'link',
    icontype: 'fas fa-car text-default'
  },
  {
    path: '/admin/airport',
    title: 'Airport (KLIA)',
    type: 'link',
    icontype: 'fas fa-plane-departure text-default'
  },
  {
    path: '/admin/tax',
    title: 'Tax Exemptions & Refund',
    type: 'link',
    icontype: 'fas fa-file-invoice-dollar text-default'
  },
  {
    path: '/admin/others',
    title: 'Other services',
    type: 'link',
    icontype: 'fas fa-toolbox text-default'
  },
  {
    path: '/admin/security',
    title: 'Security',
    type: 'link',
    icontype: 'fas fa-shield-alt text-default'
  },
  {
    path: '/admin/references',
    title: 'References',
    type: 'link',
    icontype: 'fas fa-book text-default'
  },
  {
    path: '/admin/management',
    title: 'Management',
    type: 'sub',
    icontype: 'fas fa-file-invoice text-default',
    collapse: 'management',
    isCollapsed: true,
    children: [
      { path: 'audit-trails', title: 'Audit Trails', type: 'link' },
      { path: 'user', title: 'User', type: 'link' }
    ]
  },
  {
    path: '/admin/report',
    title: 'Reporting',
    type: 'link',
    icontype: 'fas fa-chart-bar text-default'
  },
  /*
  {
    path: '/helpdesk',
    title: 'Helpdesk',
    type: 'link',
    icontype: 'fas fa-life-ring text-blue'
  },
  {
    path: '/audit',
    title: 'Audit Trail',
    type: 'link',
    icontype: 'fas fa-braille text-indigo'
  }
  */
];

export const ROUTESUSER: RouteInfo[] = [
  
  {
    path: '/user/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-desktop text-default'
  },
  {
    path: '/user/id-visa',
    title: 'Identification & Visa',
    type: 'link',
    icontype: 'fas fa-address-card text-default'
  },
  {
    path: '/user/vehicle',
    title: 'Vehicle',
    type: 'link',
    icontype: 'fas fa-car text-default'
  },
  {
    path: '/user/airport',
    title: 'Airport (KLIA)',
    type: 'link',
    icontype: 'fas fa-plane-departure text-default'
  },
  {
    path: '/user/tax',
    title: 'Tax Exemptions & Refund',
    type: 'link',
    icontype: 'fas fa-file-invoice-dollar text-default'
  },
  {
    path: '/user/others',
    title: 'Other services',
    type: 'link',
    icontype: 'fas fa-toolbox text-default'
  },
  {
    path: '/user/security',
    title: 'Security',
    type: 'link',
    icontype: 'fas fa-shield-alt text-default'
  },
  /*{
    path: '/applications',
    title: 'Applications',
    type: 'link',
    icontype: 'fas fa-file-invoice text-pink'
  },
  {
    path: '/houses',
    title: 'Houses',
    type: 'link',
    icontype: 'fas fa-home text-purple'
  },
  {
    path: '/management',
    title: 'Management',
    type: 'link',
    icontype: 'fas fa-tasks text-red'
  },
  {
    path: '/report',
    title: 'Report',
    type: 'link',
    icontype: 'fas fa-chart-bar text-green'
  },
  {
    path: '/helpdesk',
    title: 'Helpdesk',
    type: 'link',
    icontype: 'fas fa-life-ring text-blue'
  },
  {
    path: '/audit',
    title: 'Audit Trail',
    type: 'link',
    icontype: 'fas fa-braille text-indigo'
  },
  {
    path: '/maintenance',
    title: 'Maintenance',
    type: 'link',
    icontype: 'fas fa-cogs text-orange'
  }*/
  /*{
    path: '/settings',
    title: 'Settings',
    type: 'link',
    icontype: 'fas fa-sliders-h text-blue'
  }*/
];