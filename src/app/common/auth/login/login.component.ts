import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
    userName = '';
    password = '';
    tavern = '';
    // create var for new required fields
    showSignup = false;
    checked = false;
    role;
    

    //Taverns Array
    Taverns = [{
        Id: 1,
        Name: "Moe's Tavern"
    },
    {
        Id: 2,
        Name: "Joe's Tavern"
    },
    {
        Id: 3,
        Name: "Blasphemy Bar"
    },
    {
        Id: 4,
        Name: "Rejected Reality"
    },
    {
        Id: 5,
        Name: "Brianna's"
    }];
    selected: any;

        constructor(private router: Router, private authService: AuthService) {}

        //checkbox toggles admin checkbox and assigns role to 1 if user is admin
    checkbox(): void {
        this.checked = !this.checked;
        this.tavern = '';
        if (this.checked == false){
            this.role = 2;
        }
        else {
            this.role = 1;
    }
    }
    ngOnInit(): void {
        console.log('comes into being');
    }

    ngOnDestroy(): void {
        console.log('is destroyed');
    }

    toggleSignup(): void {
    this.showSignup = !this.showSignup;
    this.userName = '';
    this.password = '';
    this.tavern = '';
    this.checked = false;
   
    }

    signup(): void {
        const payload = {
            UserName: this.userName,
            Password: this.password,
            Tavern: this.tavern,
            RoleId: this.role
        };
        console.log(payload);
        
        this.authService.create(payload).subscribe(
            (user) => {
                if (user) {
                    this.router.navigateByUrl('/login');
                    console.log('Successfuly Signed Up!');
                }
            },
        (error) => {
            console.log(error);
        },
        );
    }
    login(): void {
        this.authService.login(this.userName, this.password).subscribe(
            (response) => {
                if (response.success) {
                    console.log('successful login');
                    this.router.navigateByUrl('/home');
                }
            },
            (error) => {
                console.log('username/password incorrect');
            },
        );
    }
}
