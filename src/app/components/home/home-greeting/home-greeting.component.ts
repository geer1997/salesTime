import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home-greeting',
  templateUrl: './home-greeting.component.html',
  styleUrls: ['./home-greeting.component.scss']
})
export class HomeGreetingComponent implements OnInit {

  @Input() user: User;

  // Data de muestra
  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

  // Chart Functions

  /**
   * Chart Function (POR DEFINIR, SOLO MUESTRA)
   * Fuente: https://medium.com/codingthesmartway-com-blog/angular-chart-js-with-ng2-charts-e21c8262777f
   * @param param0 
   * @author Germano Rojas
   */
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  /**
   * Chart function (POR DEFINIR, SOLO MUESTRA)
   * Fuente: https://medium.com/codingthesmartway-com-blog/angular-chart-js-with-ng2-charts-e21c8262777f
   * @param param0 
   * @author Germano Rojas
   */
  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
