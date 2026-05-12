import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html', standalone: false })
export class ListComponent implements OnInit {
    accounts?: any[];

    constructor(
        private accountService: AccountService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(accounts => {
                this.accounts = accounts;
                this.cdr.detectChanges();
            });
    }

    deleteAccount(id: string) {
        const account = this.accounts!.find(x => x.id === id);
        account.isDeleting = true;
        this.cdr.detectChanges();

        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.accounts = this.accounts!.filter(x => x.id !== id);
                this.cdr.detectChanges();
            });
    }
}
