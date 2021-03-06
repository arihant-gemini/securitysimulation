import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../service/main.service';
@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {
  email:any;
  ipAddress: any;
  id:any;
  constructor(private route:ActivatedRoute,private http:HttpClient,private _mainService:MainService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.email =  params['email'];
        this.id =  params['taskId'];
      }
    )
    console.log('email',this.email);
    console.log('id',this.id);
    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      this.ipAddress = data.ip
      this.sendData(this.email,this.ipAddress,this.id);
    })

  }
  sendData(emailID:any,ip:any,id:any){
    console.log(emailID,ip);
    let obj={
      'email':emailID,
      'ip':ip,
      'taskId':id
    }
    this._mainService.sendUserDetails(obj).subscribe((data:any)=>{
      if(data){
        console.log('data sent');
      }
    })
  }

}
