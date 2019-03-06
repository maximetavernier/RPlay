'use strict';

import { Response } from 'express';

import CustomRequest from '../../core/models/http/CustomRequest';
import IInterceptor from './IInterceptor';
import ServerConfigs from "../../core/models/configs/ServerConfigs";

export default class Proxy extends IInterceptor {
    constructor(servConfigs: ServerConfigs) {
        super(servConfigs);
    }

    protected init(): void {

    }

    protected proxify(req: CustomRequest | null, _res: Response | null): void {
        if (req)
        {
            const url: string = req.url;
            const method: string = req.method;

            if (url.indexOf('.ico') < 0 && url.indexOf('.js') < 0 && url.indexOf('.css') < 0)
                console.log(`[Proxy] ${method} ${url}`);
            if (method !== 'GET' && method !== 'POST')
            {
                console.warn('[Proxy] Forbidden request.');
                this.status = 403;
            }
            if (method === 'POST')
                console.log(JSON.stringify(req.body));
        } else
            this.status = 400;
    }
}
