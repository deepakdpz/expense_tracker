import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-transactioncreate',
  templateUrl: './transactioncreate.component.html',
  styleUrls: ['./transactioncreate.component.css']
})
export class TransactioncreateComponent {

  transactionId:any
  isEdit:boolean=false

  categories=['food','fuel','entertainment','bills','rent',"emi",'miscellaneous']
  
  constructor(private service:ExpenseService){
    this.service.transactionSubject.subscribe((id:any)=>{
      // console.log(id);
      this.transactionId=id
      this.isEdit=true

      this.service.retriveTransaction(id).subscribe(data=>{
        this.transactionForm.patchValue(data)
      })
      
    })

  }

  transactionForm=new FormGroup({
    title:new FormControl("",Validators.required),
    type:new FormControl("",Validators.required),
    amount:new FormControl("",Validators.required),
    category:new FormControl("",Validators.required),
    user:new FormControl("",Validators.required)


  })

  createTransaction(){
    let data=this.transactionForm.value
    if(this.isEdit==false){
      this.service.addTransaction(data).subscribe(data=>{
        console.log(data);
        this.transactionForm.reset()
        
      })
    }
    else{
      this.service.updateTransaction
    }
    
  }

}
