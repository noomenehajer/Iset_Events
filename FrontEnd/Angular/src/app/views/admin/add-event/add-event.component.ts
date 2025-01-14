import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})

export class AddEventComponent implements OnInit {

  constructor(private eventService: EventService) {}

   private file?: File ; 
  ngOnInit(): void {
  
  }


  eventsaveform=new FormGroup({
    name:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),
    date:new FormControl('',[Validators.required,Validators.email]),
    description:new FormControl()
  });

  saveEvent(){
    this.eventService.createEvent(this.eventsaveform.value).subscribe({
      next:(data)=>{
        this.eventService.upload(this.file,data.id).subscribe({
          next:()=>{
            alert("image uploded")
          }
        })
       alert("Event added successfully")
        this.eventsaveform.reset();
      }, error:err => {
    console.log(err);
      }
    })
  }
  
   onChange(event:any) {
    
            this.file = event.target.files[0];
        }
      
  
  // eventsaveform=new FormGroup({
  //   student_name:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),
  //   student_email:new FormControl('',[Validators.required,Validators.email]),
  //   student_branch:new FormControl()
  // });

  // saveEvent(saveEvent){
  //   this.event=new Student();
  //   this.event.student_name=this.StudentName.value;
  //   this.student.student_email=this.StudentEmail.value;
  //   this.student.student_branch=this.StudentBranch.value;
  //   this.submitted = true;
  //   this.save();
  // }


  // eventsaveform=new FormGroup({
  //   student_name:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),
  //   student_email:new FormControl('',[Validators.required,Validators.email]),
  //   student_branch:new FormControl()
  // });
/*
  saveEvent(saveEvent){
    this.event=new Student();
    this.event.student_name=this.StudentName.value;
    this.student.student_email=this.StudentEmail.value;
    this.student.student_branch=this.StudentBranch.value;
    this.submitted = true;
    this.save();
  }
*/

  // save() {
  //   this.studentservice.createStudent(this.student).subscribe(data => console.log(data), error => console.log(error));
  //   this.student = new Student();
  // }

  // get StudentName(){
  //   return this.studentsaveform.get('student_name');
  // }

  // get StudentEmail(){
  //   return this.studentsaveform.get('student_email');
  // }

  // get StudentBranch(){
  //   return this.studentsaveform.get('student_branch');
  // }

  // addStudentForm(){
  //   this.submitted=false;
  //   this.studentsaveform.reset();
  // }

}
