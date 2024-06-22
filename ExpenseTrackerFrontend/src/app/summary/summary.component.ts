import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import {Chart,registerables} from 'node_modules/chart.js'

Chart.register(...registerables)


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  totalIncome=0
  totalExpense=0
  summary:any
  chart:any

  constructor(private service:ExpenseService){
      this.service.reloadRequired.subscribe(data=>{
        this.ngOnInit()
      })
  }

  ngOnInit(){

    this.service.transactionSummary().subscribe((data:any)=>{
      console.log(data);
      this.totalIncome=data.total_income
      this.totalExpense=data.total_expense
      this.summary=data.category_summary


      this.displayChart(this.summary)

      
    })

  }

  displayChart(summary:any){

    if (this.chart){
      this.chart.destroy()
    }



    let ctx:any = document.getElementById('myChart');

  this.chart=new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: summary.map((obj:any)=>obj.category),
      datasets: [{
        label: '# of Votes',
        data: summary.map((obj:any)=>obj.total),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  }



}
