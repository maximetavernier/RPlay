'use strict';

import { Response, Request } from 'express';

import JwtService from '../../core/tools/JwtService';
import CustomRequest from '../../core/models/http/CustomRequest';
import ServerConfigs from '../../core/models/configs/ServerConfigs';

export default abstract class IInterceptor {
    /**
     * Server infos
     */
    protected host: string;
    protected env: string;

    /**
     * Useful for auth control
     */
    protected jwtService: JwtService;

    /**
     * Block request
     */
    protected status: number;

    /**
     * Authorized Routes
     */
    protected authorizedRoute: RegExp[];

    constructor(servConfigs: ServerConfigs) {
        this.host = servConfigs.host;
        this.env = servConfigs.env;

        this.jwtService = new JwtService();

        this.authorizedRoute = [
            /^\/robots.txt$/g,
            /^\/health$/g
        ];

        this.init();
    }

    protected abstract init(): void;
    protected abstract proxify(req: CustomRequest | null, res: Response | null): void;

    public Interceptor(): (req: Request | null, res: Response | null, next: any) => void {
        return (req: Request | null, res: Response | null, next: any) => {
            this.status = 200;
            if (req) {
                for (let i = 0; i < this.authorizedRoute.length; ++i)
                    if (req.url.match(this.authorizedRoute[i])) {
                        next();
                        return;
                    }

                this.proxify(req as CustomRequest, res);
                if (this.status === 200)
                    next();
                else if (res && this.status >= 400)
                    res.status(this.status).end();
            }
        }
    }
}