import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TavernsService, ITavern } from '../../../Taverns/taverns.service';


@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
    userName = '';
    password = '';
    tavern: ITavern;
    tavernName = '';
    // create var for new required fields
    showSignup = false;
    checked = false;
    role;
    taverns: ITavern[];

        constructor(private router: Router, private authService: AuthService, private tavernsService: TavernsService) {}

        //checkbox toggles admin checkbox and assigns role to 1 if user is admin
    checkbox(): void {
        this.checked = !this.checked;
        this.tavernName = '';
    }

    ngOnInit(): void {
        console.log('comes into being');
        this.tavernsService.getTaverns().subscribe((returnedTaverns) => {
        this.taverns = returnedTaverns;
    });
}
    ngOnDestroy(): void {
        console.log('is destroyed');
    }

    toggleSignup(): void {
    this.showSignup = !this.showSignup;
    this.userName = '';
    this.password = '';
    this.tavernName = '';
    this.checked = false;
   
    }

    signup(): void {
        const payload = {
            UserName: this.userName,
            Password: this.password,
            Tavern: this.tavern
        };
        console.log(payload);
        
        this.authService.create(payload).subscribe(
            (user) => {
                if (user) {
                    this.toggleSignup();
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
                    this.router.navigateByUrl('/my-tavern');
                }
            },
            (error) => {
                console.log('username/password incorrect');
            },
        );
    }
}
