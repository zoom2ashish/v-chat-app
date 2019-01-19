import { Component, OnInit } from '@angular/core';
import { Form, NgForm, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public isLoading = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onRegister(registrationForm: NgForm) {
    if (registrationForm.invalid) {
      return;
    }

    const value = registrationForm.value;
    this.isLoading = true;
    this.userService.register(value);
  }
}
