import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService  {

  testing(){
    console.log("Testing successful")
  }

}
