import { Component } from '@angular/core';
import { FotoService } from '../services/foto.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  urlimagestorage : string[] = [];

  constructor(private afStorage : AngularFireStorage, public fotoService : FotoService) 
  {
     
  }

  async ionViewDidEnter()
  {
    this.tampildata();
  }

  tampildata()
  {
    this.urlimagestorage = [];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll().then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((url) => {
          this.urlimagestorage.unshift(url)
        })
      });
    }).catch((error) => {
      console.log(error)
    });
  }

}
