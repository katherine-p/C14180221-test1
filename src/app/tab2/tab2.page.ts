import { Component } from '@angular/core';
import { FotoService } from '../services/foto.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  urlimagestorage : string[] = [];

  constructor(public fotoService:FotoService, private afStorage : AngularFireStorage) {}

  async ngOnInit()
  {
    await this.fotoService.loadFoto();
  }

  foto()
  {
    this.fotoService.tambahFoto();
  }
  
  async ionViewDidEnter()
  {
    await this.fotoService.loadFoto();
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

  uploadfoto()
  {
    this.urlimagestorage = [];
    for (var index in this.fotoService.dataFoto)
    {
      const imgFilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`;
      this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
          this.urlimagestorage.unshift(url);
        });
      });
    }
  }

}
