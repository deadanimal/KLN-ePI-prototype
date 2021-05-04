import { Component, NgZone, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
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
  selector: "app-others",
  templateUrl: "./others.component.html",
  styleUrls: ["./others.component.scss"],
})
export class OthersComponent implements OnInit, OnDestroy {
  // Chart
  private chart1: any;
  private chart2: any;

  typeapp:number = 0;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // Form
  registerForm: FormGroup

  //table
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      name: "Tiger Nixon",
      office: "Edinburgh",
      status: "1",
      type: "1"
    },
    {
      name: "Garrett Winters",
      office: "Tokyo",
      status: "2",
      type: "1"
    },
    {
      name: "Ashton Cox",
      office: "San Francisco",
      status: "1",
      type: "1"
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
      type: "1"
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
      type: "4"
    },
    {
      name: "Tatyana Fitzpatrick",
      office: "London",
      status: "3",
      type: "2"
    },
    {
      name: "Michael Silva",
      office: "London",
      status: "2",
      type: "4"
    },
    {
      name: "Paul Byrd",
      office: "New York",
      status: "2",
      type: "1"
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
      type: "4"
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
      type: "2"
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

  OnChange($event){
    console.log($event.target.value);
    
    this.typeapp = $event.target.value
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChart1();
      this.getChart2();
    });
  }

  getChart1() {
    // Themes begin
    am4core.useTheme(am4themes_moonrisekingdom);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("os1", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        country: "Waiting for approval",
        litres: 501.9,
      },
      {
        country: "Approved",
        litres: 301.9,
      },
      {
        country: "Rejected",
        litres: 201.1,
      },
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);
  }

  getChart2() {
    // Themes begin
    am4core.useTheme(am4themes_moonrisekingdom);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("os2", am4charts.PieChart);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    // change the cursor on hover to make it apparent the object can be interacted with
    pieSeries.slices.template.cursorOverStyle = [
      {
        property: "cursor",
        value: "pointer",
      },
    ];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    let shadow = pieSeries.slices.template.filters.push(
      new am4core.DropShadowFilter()
    );
    shadow.opacity = 0;

    // Create hover state
    let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = [
      {
        country: "Further studies",
        litres: 99,
      },
      {
        country: "Letter of banking purpose",
        litres: 139.9,
      },
      {
        country: "Spouse employment",
        litres: 128.3,
      },
    ];
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
