import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhotoBoardModule } from 'src/app/shared/components/photo-board/photo-board.module';
import { PhotoListComponent } from './photo-list.component';

@NgModule({
  declarations: [
    PhotoListComponent,
  ],
  imports: [
    CommonModule,
    PhotoBoardModule,
  ],
  exports: [
    PhotoListComponent,
  ]
})
export class PhotoListModule {}
