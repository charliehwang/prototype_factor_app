import {
  Input,
  ViewChild,
  ElementRef,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DimensionsType, ScaleType } from '../utils/types';
import * as d3 from 'd3';

@Component({
  selector: '[appAxis]',
  templateUrl: './axis.component.html',
  styleUrls: ['./axis.component.scss'],
})
export class AxisComponent implements OnChanges {
  @Input() dimensions: DimensionsType;
  @Input() dimension: 'x' | 'y' = 'x';
  @Input() scale: ScaleType;
  @Input() label: string;
  @Input() formatTick: (value: any) => string | number = d3.format(',');

  public ticks: Function[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateTicks();
  }

  updateTicks() {
    if (!this.dimensions || !this.scale) return;

    const numberOfTicks =
      // @ts-ignore
      this.dimension == 'x'
        ? // @ts-ignore
          this.dimensions.boundedWidth < 600
          ? // @ts-ignore
            this.dimensions.boundedWidth / 100
          : // @ts-ignore
            this.dimensions.boundedWidth / 125
        : // @ts-ignore
          this.dimensions.boundedHeight / 35;

    this.ticks = this.scale.ticks(numberOfTicks);
  }

  // @ViewChild('axis', { static: true }) axis: ElementRef;
  // updateTicks() {
  //   //@ts-ignore
  //   const yAxisGenerator = d3.axisLeft().scale(this.scale);

  //   const yAxis = d3.select(this.axis.nativeElement).call(yAxisGenerator);

  //   d3.select(this.axis.nativeElement);
  // }
}
