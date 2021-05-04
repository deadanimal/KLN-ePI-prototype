import { Component, NgZone, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { BsModalRef, BsModalService } from "ngx-bootstrap";

import swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-tax",
  templateUrl: "./tax.component.html",
  styleUrls: ["./tax.component.scss"],
})
export class TaxComponent implements OnInit, OnDestroy {
  // Chart
  private chart1: any;
  private chart2: any;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // Form
  registerForm: FormGroup

  // table
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      name: "Tiger Nixon",
      office: "Edinburgh",
      status: "1",
      type: "5"
    },
    {
      name: "Garrett Winters",
      office: "Tokyo",
      status: "2",
      type: "4"
    },
    {
      name: "Ashton Cox",
      office: "San Francisco",
      status: "1",
      type: "6"
    },
    {
      name: "Cedric Kelly",
      office: "Edinburgh",
      status: "3",
      type: "1"
    },
    {
      name: "Airi Satou",
      office: "Tokyo",
      status: "2",
      type: "4"
    },
    {
      name: "Brielle Williamson",
      office: "New York",
      status: "3",
      type: "3"
    },
    {
      name: "Herrod Chandler",
      office: "San Francisco",
      status: "3",
      type: "4"
    },
    {
      name: "Rhona Davidson",
      office: "Tokyo",
      status: "3",
      type: "5"
    },
    {
      name: "Colleen Hurst",
      office: "San Francisco",
      status: "1",
      type: "2"
    },
    {
      name: "Sonya Frost",
      office: "Edinburgh",
      status: "1",
      type: "3"
    },
    {
      name: "Jena Gaines",
      office: "London",
      status: "1",
      type: "4"
    },
    {
      name: "Quinn Flynn",
      office: "Edinburgh",
      status: "1",
      type: "2"
    },
    {
      name: "Charde Marshall",
      office: "San Francisco",
      status: "2",
      type: "2"
    },
    {
      name: "Haley Kennedy",
      office: "London",
      status: "2",
      type: "6"
    },
    {
      name: "Tatyana Fitzpatrick",
      office: "London",
      status: "3",
      type: "5"
    },
    {
      name: "Michael Silva",
      office: "London",
      status: "2",
      type: "6"
    },
    {
      name: "Paul Byrd",
      office: "New York",
      status: "2",
      type: "4"
    },
    {
      name: "Gloria Little",
      office: "New York",
      status: "1",
      type: "2"
    },
    {
      name: "Bradley Greer",
      office: "London",
      status: "1",
      type: "3"
    },
    {
      name: "Dai Rios",
      office: "Edinburgh",
      status: "2",
      type: "2"
    },
    {
      name: "Jenette Caldwell",
      office: "New York",
      status: "1",
      type: "1"
    },
    {
      name: "Yuri Berry",
      office: "New York",
      status: "1",
      type: "6"
    },
    {
      name: "Caesar Vance",
      office: "New York",
      status: "1",
      type: "1"
    },
    {
      name: "Doris Wilder",
      office: "Sidney",
      status: "3",
      type: "4"
    },
    {
      name: "Angelica Ramos",
      office: "London",
      status: "3",
      type: "3"
    },
    {
      name: "Gavin Joyce",
      office: "Edinburgh",
      status: "2",
      type: "3"
    },
    {
      name: "Jennifer Chang",
      office: "Singapore",
      status: "1",
      type: "2"
    },
    {
      name: "Brenden Wagner",
      office: "San Francisco",
      status: "1",
      type: "4"
    },
    {
      name: "Fiona Green",
      office: "San Francisco",
      status: "1",
      type: "2"
    },
    {
      name: "Shou Itou",
      office: "Tokyo",
      status: "1",
      type: "2"
    },
  ];
  SelectionType = SelectionType;

  constructor(private zone: NgZone, private modalService: BsModalService) {
    // table
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });
  }

  // table
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(selected);
  }
  onActivate(event) {
    this.activeRow = event.row;
  }

  // chart
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart1) {
        console.log("Chart disposed");
        this.chart1.dispose();
      }
      if (this.chart2) {
        console.log("Chart disposed");
        this.chart2.dispose();
      }
    });
  }
  ngOnInit() {
    this.getCharts();
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChart1();
      this.getChart2();
    });
  }

  getChart1() {
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("ter1", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        country: "Waiting for approval",
        value: 401,
      },
      {
        country: "Approved",
        value: 165,
      },
      {
        country: "Rejected",
        value: 128,
      },
    ];
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "country";

    series.slices.template.cornerRadius = 10;
    series.slices.template.innerCornerRadius = 7;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;
    series.alignLabels = false;

    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;

    chart.legend = new am4charts.Legend();
  }

  getChart2() {
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("ter2", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        country: "Refund Service tax",
        litres: 301.9,
      },
      {
        country: "Customs Excise Duty and Sales Tax",
        litres: 201.1,
      },
      {
        country: "Stamp Duty for Tenancy Agreement",
        litres: 165.8,
      },
      {
        country: "Property Gains Tax",
        litres: 139.9,
      },
      {
        country: "Assessment Rates",
        litres: 128.3,
      },
      {
        country: "Purchase Vehicle",
        litres: 208.3,
      },
    ];

    // Set inner radius
    chart.innerRadius = am4core.percent(50);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
    this.registerForm.reset()
  }

  confirm() {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to approve this?",
        type: "info",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Confirm",
        showCancelButton: true,
        cancelButtonClass: "btn btn-danger",
        cancelButtonText: "Cancel",
      })
      .then((result) => {
        if (result.value) {
          this.approve();
        }
      });
  }

  approve() {
    swal
      .fire({
        title: "Success",
        text: "Application has been approved!",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Close",
      })
      .then((result) => {
        if (result.value) {
          this.modal.hide();
          this.registerForm.reset();
        }
      });
  }

  reject() {
    swal
      .fire({
        title: "Rejection",
        text: "Are you sure to reject this?",
        type: "warning",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Confirm",
        showCancelButton: true,
        cancelButtonClass: "btn btn-danger",
        cancelButtonText: "Cancel",
      })
      .then((result) => {
        if (result.value) {
          this.cancel();
        }
      });
  }

  cancel() {
    swal
      .fire({
        title: "Success",
        text: "Application has been rejected!",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Close",
      })
      .then((result) => {
        if (result.value) {
          this.modal.hide();
          this.registerForm.reset();
        }
      });
  }
}
