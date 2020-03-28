import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {of} from 'rxjs';
import { StocksComponent } from './stocks.component';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;

  let PriceQueryMock = {
    priceQueries$: of(["date", 340])
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksComponent ],
      imports: [NoopAnimationsModule,SharedUiChartModule, ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        SharedUiChartModule],
      providers: [{provide: PriceQueryFacade, useValue: PriceQueryMock }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
