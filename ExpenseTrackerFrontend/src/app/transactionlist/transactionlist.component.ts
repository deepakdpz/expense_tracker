import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-transactionlist',
  templateUrl: './transactionlist.component.html',
  styleUrls: ['./transactionlist.component.css']
})
export class TransactionlistComponent implements OnInit {

  transactions:any

  constructor(private service:ExpenseService){

    this.service.reloadRequired.subscribe(data=>{
      this.ngOnInit()
    })
    
  }
  ngOnInit(){
    this.service.getTransactions().subscribe(data=>{
      this.transactions=data
    })
  }
  deleteTransaction(id:number){
    this.service.destroyTransaction(id).subscribe(data=>{
      // console.log(data);
      this.ngOnInit()
      
    })
  }

  emitTransactionId(id:number){
    this.service.dispatchTransactionId(id)
  }

}
