import { Component, NgZone, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
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
  selector: "app-id-visa",
  templateUrl: "./id-visa.component.html",
  styleUrls: ["./id-visa.component.scss"],
})
export class IdVisaComponent implements OnInit, OnDestroy {
  // Chart
  private chart1: any;
  private chart2: any;
  private chart3: any;

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
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(selected);
  }
  onActivate(event) {
    this.activeRow = event.row;
  }

  // ^table

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
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("idv1", am4charts.XYChart);
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "category";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "category";
      series.name = name;

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#ffffff");

      return series;
    }

    chart.data = [
      {
        category: "January",
        first: 40,
        second: 55,
        third: 60,
      },
      {
        category: "February",
        first: 30,
        second: 78,
        third: 69,
      },
      {
        category: "March",
        first: 27,
        second: 40,
        third: 45,
      },
      {
        category: "April",
        first: 50,
        second: 33,
        third: 22,
      },
      {
        category: "May",
        first: 20,
        second: 53,
        third: 22,
      },
      {
        category: "June",
        first: 32,
        second: 33,
        third: 22,
      },
      {
        category: "July",
        first: 50,
        second: 33,
        third: 22,
      },
      {
        category: "August",
        first: 12,
        second: 21,
        third: 22,
      },
      {
        category: "September",
        first: 19,
        second: 33,
        third: 22,
      },
      {
        category: "October",
        first: 70,
        second: 23,
        third: 22,
      },
      {
        category: "November",
        first: 30,
        second: 63,
        third: 22,
      },
      {
        category: "December",
        first: 45,
        second: 53,
        third: 22,
      },
    ];

    createSeries("first", "ID Card");
    createSeries("second", "Visa");
    // createSeries("third", "The Third");

    function arrangeColumns() {
      let series = chart.series.getIndex(0);

      let w =
        1 -
        xAxis.renderer.cellStartLocation -
        (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            } else {
              series.dummyData = chart.series.indexOf(series);
            }
          });
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta;

            series.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
            series.bulletsContainer.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
          });
        }
      }
    }
  }

  getChart2() {
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("idv2", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        country: "New",
        litres: 501.9,
      },
      {
        country: "Extend",
        litres: 301.9,
      },
      {
        country: "Lost",
        litres: 201.1,
      },
      {
        country: "Broken",
        litres: 165.8,
      },
    ];

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

  getChart3() {
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("idv3", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        country: "Single entry",
        litres: 466.7,
      },
      {
        country: "Multiple entry",
        litres: 301.9,
      },
      {
        country: "Permit of stay",
        litres: 128.3,
      },
      {
        country: "Exemption order",
        litres: 99,
      },
    ];

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
