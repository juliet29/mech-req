import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

// create http headers
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class RequestService {
  constructor(public http: HttpClient) {}
  // public apiURL = "http://127.0.0.1:8000/mech-app/";
  // production url
  apiURL = "http://ssgl2019.pythonanywhere.com/mech-app/";
  // use http.get() to load data from API endpoint
  list() {
    return this.http.get(this.apiURL + "service/");
    // should add error handling
  }

  list_user(author) {
    // get information about the user and put in local storage
    let param1 = new HttpParams().set("author", author);
    return this.http.get(this.apiURL + "service/", { params: param1 });
  }

  list_request(id) {
    // get information about the user and put in local storage
    let param1 = new HttpParams().set("request_id", id);
    return this.http.get(this.apiURL + "service/", { params: param1 });
  }

  create(newRequest) {
    var mytest: any;
    mytest = this.http.post(this.apiURL + "service/", newRequest).subscribe(
      data => {
        console.log("Service Request Creation is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
    );

    console.log(mytest);
    return mytest;
  }

  edit(id, request) {
    return this.http.put(
      this.apiURL + "edit-service/" + id,
      request,
      httpOptions
    );
  }

  formatTime(sqlTime) {
    const months = [
      "January",
      "Februaury",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    sqlTime = new Date(sqlTime);
    let hours = sqlTime.getHours();
    let minutes = sqlTime.getMinutes();

    // format hours and minutes
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // put the time and date together in a nice format
    let justTime = hours + ":" + minutes + " " + ampm;
    let niceTime =
      months[sqlTime.getMonth()] +
      " " +
      sqlTime.getDate() +
      ", " +
      sqlTime.getFullYear() +
      " - " +
      justTime;

    //console.log(niceTime);
    return niceTime;
  }

  formatStatus(intStatus) {
    if (intStatus == 0) {
      return "PENDING";
    } else if (intStatus == 1) {
      return "ONGOING";
    } else {
      return "COMPLETED";
    }
  }
}
