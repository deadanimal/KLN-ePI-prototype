import { Component, NgZone, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
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
  selector: "app-security",
  templateUrl: "./security.component.html",
  styleUrls: ["./security.component.scss"],
})
export class SecurityComponent implements OnInit, OnDestroy {
  // Chart
  private chart1: any;
  private chart2: any;
  private chart3: any;

  typeapp:number = 0;

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
      type: "4"
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
      type: "4"
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
      type: "4"
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
      type: "4"
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

  OnChange($event){
    console.log($event.target.value);
    
    this.typeapp = $event.target.value
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
      if (this.chart3) {
        console.log("Chart disposed");
        this.chart3.dispose();
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
      this.getChart3();
    });
  }

  getChart1() {
    // Themes begin
    am4core.useTheme(am4themes_spiritedaway);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("sec1", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        country: "Approved",
        litres: 201.1,
      },
      {
        country: "Waiting for approval",
        litres: 69,
      },
      {
        country: "Rejected",
        litres: 139,
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
    am4core.useTheme(am4themes_spiritedaway);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("sec2", am4charts.PieChart);

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
        country: "License for firearms",
        litres: 35,
      },
      {
        country: "Request for security assistance",
        litres: 165,
      },
      {
        country: "Report for violation of diplomatic poach",
        litres: 83,
      },
    ];
  }

  getChart3() {
    // Themes begin
    am4core.useTheme(am4themes_spiritedaway);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("sec3", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [
      {
        country: "USA",
        visits: 3025,
      },
      {
        country: "China",
        visits: 1882,
      },
      {
        country: "Japan",
        visits: 1809,
      },
      {
        country: "Germany",
        visits: 1322,
      },
      {
        country: "UK",
        visits: 1122,
      },
      {
        country: "France",
        visits: 1114,
      },
      {
        country: "India",
        visits: 984,
      },
      {
        country: "Spain",
        visits: 711,
      },
      {
        country: "Netherlands",
        visits: 665,
      },
      {
        country: "Russia",
        visits: 580,
      },
      {
        country: "South Korea",
        visits: 443,
      },
      {
        country: "Canada",
        visits: 441,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();
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
