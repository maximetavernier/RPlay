'use strict';

import { Response } from 'express';
import IController from './IController';
import JwtService from "../../core/tools/JwtService";
import EncryptionService from "../../core/tools/EncryptionService";
import ServerConfigs from "../../core/models/configs/ServerConfigs";
import HttpResponse from "../../core/models/http/HttpResponse";
import JwtPayload from "../../core/models/access/JwtPayload";
import CustomRequest from "../../core/models/http/CustomRequest";

export default class Access extends IController {
    jwtService: JwtService;
    encryptionService: EncryptionService;

    constructor(servConfigs: ServerConfigs) {
        super(servConfigs, '/access');
        this.jwtService = new JwtService();
        this.encryptionService = new EncryptionService();
    }

    protected init(): void {
        this.router.get(`${this.routePrefix}/authorization`, this.getAuthorization.bind(this));
        this.router.post(`${this.routePrefix}/login`, this.login.bind(this));
    }

    private getAuthorization(req: CustomRequest | null, res: Response | null, _next: any) {
        let authToken: string | undefined = undefined;

        if (req && req.cookies) {
            authToken = this.getAuth(req);
        } else {
            console.error('[Access.Authorization] No jwt token found');
        }
        if (res) {
            if (authToken) {
                this.jwtService.Decode(authToken).then((payload: JwtPayload) => {
                    this.encryptionService.Decode(payload.auth).then((auth: string) => {
                        this.httpClient.get('/user', auth).then((response: HttpResponse) => {
                            res.status(response.statusCode).end();
                        }).catch(() => {
                            console.error('[Access.Authorization] Auth token is not valid');
                            res.status(403).end();
                        })
                    }).catch(() => {
                        console.error('[Access.Authorization] Cannot decode auth token');
                        res.status(404).end();
                    })
                }).catch(() => {
                    console.error('[Access.Authorization] Cannot decode jwt');
                    res.status(400).end();
                })
            } else {
                res.status(401).end();
            }
        }
    }

    private login(req: CustomRequest | null, res: Response | null, _next: any) {
        //let auth: string | undefined;
        if (req && req.body) {
            //auth = new Buffer(`${req.body.username}:${req.body.password}`).toString('base64');
        } else {
            console.log('[Access.Login] Unable to retrieve request object or body');
        }

        if (res) {

        }
    }
}
