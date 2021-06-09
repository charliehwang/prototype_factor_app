import { Component, OnInit } from '@angular/core';
import { AccessorType } from '../utils/types';
import { getTimelineData } from '../utils/populateData';
import * as d3 from 'd3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // @ts-ignore
  cashBalanceData: Array<timelineDataPoint>;
  cashBalanceAccessor: AccessorType;

  accountReceivablesData: Array<timelineDataPoint>;
  accountReceivablesAccessor: AccessorType;

  escrowReservesData: Array<timelineDataPoint>;
  escrowReservesAccessor: AccessorType;

  dateAccessor: AccessorType;
  parseDate: (value: string) => object;

  constructor() {
    // @ts-ignore
    this.parseDate = d3.timeParse('%m/%d/%Y');
    this.dateAccessor = (d) => this.parseDate(d.date);

    this.cashBalanceData = [];
    this.cashBalanceAccessor = (d) => d.totalAmount;

    this.accountReceivablesData = [];
    this.accountReceivablesAccessor = (d) => d.totalAmount;

    this.escrowReservesData = [];
    this.escrowReservesAccessor = (d) => d.totalAmount;
  }

  ngOnInit(): void {
    this.getData();
    setInterval(() => this.getData(), 5000);
  }

  getData(): void {
    // @ts-ignore
    const M = 1000000; // Million
    const totalAmountMean = 2 * M;
    const totalAmountMeanDeviation = 0.2 * M;

    // @ts-ignore
    this.cashBalanceData = getTimelineData(
      100,
      'totalAmount',
      totalAmountMean,
      totalAmountMeanDeviation
    );

    // @ts-ignore
    this.accountReceivablesData = getTimelineData(
      100,
      'totalAmount',
      5 * M,
      5 * M * 0.3
    );

    // @ts-ignore
    this.escrowReservesData = getTimelineData(
      100,
      'totalAmount',
      1 * M,
      1 * M * 0.03
    );
  }
}

interface timelineDataPoint {
  date: string;
  totalAmount: number;
  // key: any;
}
