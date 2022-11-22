import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, FormControl, ValidationErrors, Validator } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { AuthService } from "../auth.service";


@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService) { }
    validate = (control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> | any => {
        const { value } = control;

        return this.authService.usernameAvailable(value)
            .pipe(
                map((value) => {
                    return null;
                }),
                catchError((err) => {
                    console.log(err);
                    if (err.error.username) {
                        return of({ notUniqueUsername: true });
                    } else {
                        return of({ noConnection: true });
                    }
                })

            );
    }
}
