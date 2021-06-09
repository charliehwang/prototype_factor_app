import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TimelineComponent } from '../timeline/timeline.component';
import { ChartComponent } from '../chart/chart.component';
import { LineComponent } from '../line/line.component';
import { AxisComponent } from '../axis/axis.component';
import { GradientComponent } from '../gradient/gradient.component';

@NgModule({
  declarations: [
    HomeComponent,
    TimelineComponent,
    ChartComponent,
    LineComponent,
    AxisComponent,
    GradientComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
