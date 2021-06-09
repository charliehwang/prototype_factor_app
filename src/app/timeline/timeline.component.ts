import {
  ViewChild,
  ElementRef,
  Input,
  Component,
  AfterContentInit,
  HostListener,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DimensionsType, AccessorType, ScaleType } from '../utils/types';
import * as d3 from 'd3';
import { getUniqueId } from '../utils/chart-utils';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements AfterContentInit, OnChanges {
  @Input() data: object[];
  @Input() label: string;
  @Input() xAccessor: AccessorType;
  @Input() yAccessor: AccessorType;

  public dimensions: DimensionsType;

  public xScale: ScaleType;
  public yScale: ScaleType;

  public xAccessorScaled: AccessorType;
  public yAccessorScaled: AccessorType;
  public y0AccessorScaled: AccessorType;

  public formatDate: (date: Date) => string = d3.timeFormat('%-b %-d');

  public gradientId: string = getUniqueId('Timeline-gradient');
  public gradientColors: string[] = ['#E8872D', '#ebdcbc'];

  @ViewChild('timelineContainer', { static: true })
  timelineContainer: ElementRef;

  constructor() {
    this.dimensions = {
      marginTop: 40,
      marginRight: 30,
      marginBottom: 75,
      marginLeft: 75,
      height: 200,
      width: 300,
    };
    this.dimensions = {
      ...this.dimensions,
      boundedHeight: Math.max(
        this.dimensions.height -
          this.dimensions.marginTop -
          this.dimensions.marginBottom,
        0
      ),
      boundedWidth: Math.max(
        this.dimensions.width -
          this.dimensions.marginLeft -
          this.dimensions.marginRight,
        0
      ),
    };
  }

  // ngOnInit(): void {}

  ngAfterContentInit() {
    this.updateDimensions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateScales();
  }

  @HostListener('window:resize', ['$event'])
  windowResize() {
    this.updateDimensions();
  }

  updateDimensions() {
    const width = this.timelineContainer.nativeElement.offsetWidth;
    this.dimensions.width = width;
    this.dimensions.boundedWidth = Math.max(
      this.dimensions.width -
        this.dimensions.marginLeft -
        this.dimensions.marginRight,
      0
    );
    // console.log(this.container.nativeElement);
    // console.log(this.container.nativeElement.offsetWidth);
    // console.log(this.dimensions.height, this.dimensions.width);
    // console.log(this.dimensions);

    this.updateScales();
  }

  updateScales() {
    // @ts-ignore
    this.xScale = d3
      .scaleTime()
      // @ts-ignore
      .domain(d3.extent(this.data, this.xAccessor))
      // @ts-ignore
      .range([0, this.dimensions.boundedWidth]);

    // @ts-ignore
    this.yScale = d3
      .scaleLinear()
      // @ts-ignore
      .domain(d3.extent(this.data, this.yAccessor))
      // @ts-ignore
      .range([this.dimensions.boundedHeight, 0])
      .nice();

    this.xAccessorScaled = (d) => this.xScale(this.xAccessor(d));
    this.yAccessorScaled = (d) => this.yScale(this.yAccessor(d));
    this.y0AccessorScaled = this.yScale(this.yScale.domain()[0]);
  }
}
