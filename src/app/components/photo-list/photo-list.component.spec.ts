import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { buildPhotosList } from 'src/app/shared/components/photo-board/test/build-photo-list';
import { PhotoListComponent } from './photo-list.component';
import { PhotoListModule } from './photo-list.module';

describe(PhotoListComponent.name, () => {
  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;
  let service: PhotoBoardService;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      imports: [
        PhotoListModule,
        HttpClientModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PhotoBoardService);
  });

  it(`Should create component`, () => {
    expect(component).toBeTruthy();
  });

  it(`(D) Should display board when data arrives`, () => {
    const photos = buildPhotosList();
    spyOn(service, 'getPhotos')
      .and.returnValue(of(photos)); //retorno de um observable com lista de photos
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

  it(`(D) Should display loader while waiting for data`, () => {
    const photos = buildPhotosList();
    spyOn(service, 'getPhotos')
      .and.returnValue(null); // forçar não ter dados
    fixture.detectChanges(); // nesse caso, só pode ser chamado após o spyOn,ou seja, após o serviço ser modificado
    const board = fixture.nativeElement
      .querySelector('app-photo-board');
    const loader = fixture.nativeElement
      .querySelector('.loader'); // se não tem dado nenhum, spinner é exibido
    expect(board)
      .withContext('Should not display board')
      .toBeNull();
    expect(loader)
      .withContext('Should display loader')
      .not.toBeNull();
  });
});
