import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsServiceService } from '../../core/news-service/news-service.service';

import { News } from "../models/news.model";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news;
  newsId;

  constructor(private service: NewsServiceService,
              private route: ActivatedRoute) {
                route.params.subscribe(param => {
                  this.newsId = param;
                });
              }

  ngOnInit() {
    this.news= this.service.getNewsById(this.newsId.id)
      .subscribe(
        (response) => {
          this.news = response;   
        }
      );
  }

}
