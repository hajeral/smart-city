import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { NewsServiceService } from '../../core/news-service/news-service.service';
import { AuthService } from "../../core/auth-service/auth-service.service";
import { News } from "../../models/news.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadImage } from '../../models/image-models/image-upload';
import { ImageServiceService } from '../../core/image-service/image-service.service';

@Component({
  selector: 'news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})

export class NewsAddComponent implements OnInit {
  private rForm: FormGroup;                   
  private desc:string = '';
  private title:string = '';
  private showModal;
  private imageFire = '';
  progress
 
constructor(private service: NewsServiceService, 
  private router: Router, 
  private authService: AuthService,
  private imageService: ImageServiceService,
  private fb: FormBuilder) { 
    this.rForm = fb.group({
    'title' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
    'desc' : [null, Validators.compose([Validators.required, Validators.minLength(150), Validators.maxLength(1500)])],
    'validate' : ''
    });
  }

  pushImage() {
    this.imageService.uploadFile(event);
  }

  onAddNews( title, desc) {
    this.imageFire = this.imageService.fileName;
    let newsTemp: News = {  
     author: this.authService.getNickname(),
      title: title,
      image: this.imageFire,
      desc: desc, 
      date: Date,
      approved: false,
      status: 'new'
    };


    this.service.postNews(newsTemp)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
      
    this.rForm.reset();
    this.imageService.resetImage();
    this.showModal = true;
    setTimeout(()=>{    
      this.showModal = false;
    },6000);
  }

  cancel(){
    this.imageService.resetImage();
  }

  ngOnInit() {
    this.imageService.resetImage();
  }

}