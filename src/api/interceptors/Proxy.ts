'use strict';

import { Response } from 'express';

import CustomRequest from '../../core/models/http/CustomRequest';

module.exports = function(req: CustomRequest, res: Response, next: any) {
    if (req)
    {
        const url: string = req.url;
        const method: string = req.method;

        if (url.indexOf('.ico') < 0 && url.indexOf('.js') < 0 && url.indexOf('.css') < 0)
            console.log(`[Proxy] ${method} ${url}`);
        if (method !== 'GET' && method !== 'POST')
        {
            console.warn('[Proxy] Forbidden request.');
            if (res)
                res.status(403).end();
        }
        if (method === 'POST')
            console.log(JSON.stringify(req.body));
    }
    next();
};
