import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  numbers = [];
  constructor(private snackBar: MatSnackBar, public dialog: MatDialog, private fb: FormBuilder) {
    for (let i = 0; i < 1000; i++) {
      this.numbers.push(i);
    }
  }

  title = 'material-demo';
  notifications = 0;
  showSpinner = false;
  opened = false;

  options: string[] = ['Angular', 'React', 'Vue']
  objectOptions = [
    { name: 'Angular' },
    { name: 'Angular Material' },
    { name: 'React' },
    { name: 'Vue' }
  ]

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  displayedColumns: string[] = ['position', 'name', 'symbol', 'weight'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
  displayFn(subject) {
    return subject ? subject.name : undefined;
  }

  log(state) {
    console.log(state);
  }

  loadData() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 5000);
  }

  minDate = new Date();
  maxDate = new Date(2019, 9, 4);

  dateFilter = date => {
    const day = date.getDay();
    return day !== 0 && day !== 6
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action);
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogExampleComponent, { data: { name: 'Vishwas' } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result : ${result}`)
    });
  }


  registrationForm = this.fb.group({
    userName: ['Vishwas', Validators.required],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  });
}
