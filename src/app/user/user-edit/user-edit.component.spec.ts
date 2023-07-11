import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserEditComponent } from './user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { of } from 'rxjs';
import {ChangeAttributeModalComponent} from "./change-attribute-modal/change-attribute-modal.component";
import {ConfirmationModalComponent} from "../../confirmation-modal/confirmation-modal.component";
import {ChangeImgModalComponent} from "./change-img-modal/change-img-modal.component";
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {userMock} from "../../../mocks/mock";

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let dialogMock: MatDialog;

  beforeEach(async () => {
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,UserEditComponent],
      providers: [importProvidersFrom(MatDialogModule, HttpClientModule,TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }))]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    component.user = userMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
