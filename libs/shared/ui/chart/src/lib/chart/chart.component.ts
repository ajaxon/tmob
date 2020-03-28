import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {
  @Input() data: [];
  @Input() chartTitle: string;
  @Input() chartType = 'LineChart';
  @Input() chartColumnNames = ['period', 'close'];
  @Input() chartOptions: {title: 'Stock price', width: '600', height: '400'};

  constructor() {}

  ngOnInit() {}
}
