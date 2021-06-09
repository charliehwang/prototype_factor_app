import { Input, Component, OnInit } from '@angular/core';
import { DimensionsType } from '../utils/types';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() dimensions: DimensionsType;

  constructor() {}

  ngOnInit(): void {}
}
