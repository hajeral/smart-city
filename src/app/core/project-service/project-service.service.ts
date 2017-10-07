import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../models/project.model';
import { Subject } from 'rxjs/Subject';
import { AuthService } from "../auth-service/auth-service.service";
import { config } from "../config";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';

const projects_PATH = config.PATH + 'projects/';

@Injectable()
export class ProjectServiceService {


    message: string = '';
    look: Subject<any> = new Subject<any>();

    constructor(private http: Http,
        private authService: AuthService) { }

    private handleError(error: Response) {
        let errMessage = JSON.parse(error['_body']).errorMessage;
        let message = `Error status ${error.status} at ${error.url}
                       Message: ${errMessage}`;
        return Observable.throw(errMessage);
    }

    getProjects(sortBy='', type = ''): Observable<Project[]> {

        return this.http.get(projects_PATH  + `?sort=${type}${sortBy}`, this.authService.getAuthHeaderOpt())

            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    };

    getApprovedProjects(sortBy='date', type = '-'): Observable<Project[]> {

        return this.http.get(projects_PATH + `?sort=${type}${sortBy}&query={"approved":"true"}`, this.authService.getAuthHeaderOpt())
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    };

    getPaginateProjects(limit='', skip = '', sortBy='date', type = ''): Observable<Project[]> {
        
                return this.http.get(projects_PATH  + `?limit=${limit}&skip=${+skip - +limit}&sort=${type}${sortBy}`, this.authService.getAuthHeaderOpt())
        
                    .map((response: Response) => {
                        return response.json();
                    }).catch(this.handleError);
            };

    getProjectsShort(): Observable<Project[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.authService.setAuthHeader(headers);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(projects_PATH + `?select=projectName,_id,status,approved`, options)
            .map((response: Response) => {

                return response.json();
            }).catch(this.handleError);
    };

    getProjectsNumber(): Observable<any> {

        return this.http.get(config.PATH + `projects/count`, this.authService.getAuthHeaderOpt())
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    };

    getRatingProjects(): Observable<Project[]> {

        return this.http.get(projects_PATH + `?limit=3&sort=-rating`, this.authService.getAuthHeaderOpt())
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    getUserProjects(username): Observable<Project[]> {

        return this.http.get(projects_PATH + `?query={"author": "${username}"}`, this.authService.getAuthHeaderOpt())
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    };

    searchProjects(keyWord): Observable<Project[]> {

                return this.http.get(projects_PATH + `?query={"projectName":"~^(${keyWord})"}`, this.authService.getAuthHeaderOpt())
                    .map((response: Response) => {
                        return response.json();
                    }).catch(this.handleError);
            };

    getProject(id): Observable<Project> {

        return this.http.get(projects_PATH + id, this.authService.getAuthHeaderOpt())
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    };

    postProject(project: any): Observable<Project> {

        return this.http.post(projects_PATH, project, this.authService.getAuthHeaderOpt())
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

    putProject(id, projectEdit): Observable<Project> {

        return this.http.put(projects_PATH + id, projectEdit, this.authService.getAuthHeaderOpt())
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

    deleteProject(id): Observable<Project> {

        return this.http.delete(projects_PATH + id, this.authService.getAuthHeaderOpt())
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

    postLikes(id, user: any): Observable<Project> {

        return this.http.post(projects_PATH + id + `/likes`, user, this.authService.getAuthHeaderOpt())
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

    postComment(id, message: any): Observable<Project> {

        return this.http.post(projects_PATH + id + `/comments`, message, this.authService.getAuthHeaderOpt())
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

    deleteComment(projectId, commentId): Observable<Project> {

        return this.http.delete(projects_PATH + projectId + `/comments/` + commentId, this.authService.getAuthHeaderOpt())
            .map((response: Response) => {
                return <any>response.json();
            })
            .catch(this.handleError);
    };

}
