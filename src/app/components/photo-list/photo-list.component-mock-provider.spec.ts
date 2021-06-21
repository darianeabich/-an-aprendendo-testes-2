import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Photo } from 'src/app/shared/components/photo-board/interfaces/photo';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { buildPhotosList } from 'src/app/shared/components/photo-board/test/build-photo-list';
import { PhotoListComponent } from './photo-list.component';
import { PhotoListModule } from './photo-list.module';

describe(PhotoListComponent.name + 'Mock Provider', () => {
  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      imports: [
        PhotoListModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: PhotoBoardService,
          useValue: {
            getPhotos(): Observable<Photo[]> {
              return of(buildPhotosList());
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
  });

  it(`Should create component`, () => {
    expect(component).toBeTruthy();
  });

  it(`(D) Should display board when data arrives`, () => {
    fixture.detectChanges(); // nesse caso, só pode ser chamado após o spyOn,ou seja, após o serviço ser modificado
    const board = fixture.nativeElement
      .querySelector('app-photo-board'); // se estou exibindo, terá este elemento no navegador
    const loader = fixture.nativeElement
      .querySelector('.loader'); // se existir, está carregando
    expect(board)
      .withContext('Should display board')
      .not.toBeNull();
    expect(loader)
      .withContext('Should not display loader')
      .toBeNull();
  });
});
