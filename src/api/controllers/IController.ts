'use strict';

import { Router } from 'express';

import HttpClientWrapper from "../../core/lib/HttpClientWrapper";
import ServerConfigs from "../../core/models/configs/ServerConfigs";
import CustomRequest from "../../core/models/http/CustomRequest";

export default abstract class IController {
    /**
     * Server infos
     */
    protected host: string;
    protected env: string;

    protected router: Router;
    protected routePrefix: string;

    protected httpClient: HttpClientWrapper;

    constructor(serverConfigs: ServerConfigs, routePrefix: string = '/') {
        this.router = require('express').Router();
        this.routePrefix = routePrefix;

        this.host = serverConfigs.host;
        this.env = serverConfigs.env;

        /*
        const confs: HttpClientConfigs = {
            protocol: serverConfigs.github.protocol,
            host: serverConfigs.github.host
        };

        const headers: Dictionary = new Dictionary([
            new Pair('Accept', 'application/json'),
        ]);

        this.httpClient = new HttpClientWrapper(confs, headers);
        */

        this.init();
    }

    Router(): Router {
        return this.router;
    }
    protected abstract init(): void;

    protected getAuth(req: CustomRequest): string {
        return req.cookies['authToken'];
    }
}
