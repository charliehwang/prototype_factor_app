import { Input, Component, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { AccessorType } from '../utils/types';

@Component({
  selector: '[appLine]',
  // templateUrl: './line.component.html',
  template: `
    <svg:path
      [ngClass]="type"
      [attr.d]="lineString"
      [style.fill]="fill"
    ></svg:path>
  `,
  styleUrls: ['./line.component.scss'],
})
export class LineComponent implements OnChanges {
  @Input() type: 'area' | 'line' = 'line';
  @Input() data: object[];
  @Input() xAccessor: AccessorType;
  @Input() yAccessor: AccessorType;
  @Input() y0Accessor?: AccessorType;
  @Input() interpolation?: Function = d3.curveMonotoneX;
  @Input() fill?: string;

  public lineString: '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateLineString();
  }

  updateLineString(): void {
    const lineGenerator = d3[this.type]()
      .x(this.xAccessor)
      // @ts-ignore
      .y(this.yAccessor)
      .curve(this.interpolation);

    if (this.type == 'area') {
      lineGenerator.y0(this.y0Accessor).y1(this.yAccessor);
    }

    this.lineString = lineGenerator(this.data);
  }
}
