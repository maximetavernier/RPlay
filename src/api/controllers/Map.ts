'use strict';

import { Response } from 'express';
import Constants from '../../core/Constants';
import Path from '../../core/lib/Path';
import ServerConfigs from '../../core/models/configs/ServerConfigs';
import CustomRequest from '../../core/models/http/CustomRequest';

import IController from './IController';
import RenderingDataModel from "../../core/models/misc/RenderingDataModel";

export default class Map extends IController {
    constructor(servConfigs: ServerConfigs) {
        super(servConfigs);
    }

    protected init(): void {
        this.router.get('/robots.txt', this.robot.bind(this));
        this.router.get('/', this.root.bind(this));
        this.router.get('/login', this.login.bind(this));
        this.router.get('/manage', this.login.bind(this));
    }

    private robot(req: CustomRequest | null, res: Response | null, _next: any): void {
        if (req && res)
            res.sendFile(Path.combine(Constants['ConfigDirPath'], Constants['RobotsFile']));
    }

    private root(req: CustomRequest | null, res: Response | null, _next: any): void {
        let data: RenderingDataModel | undefined = undefined;
        if (req)
            data = {
                lang: req.locale,
                title: 'RPlay &ndash; Bienvenue'
            };
        if (res)
            this.render(res,'index', data);
    }

    private login(req: CustomRequest | null, res: Response | null, _next: any): void {
        let data: RenderingDataModel | undefined = undefined;
        if (req)
            data = {
                lang: req.locale,
                title: 'RPlay &ndash; Bienvenue'
            };
        if (res)
            this.render(res,'login', data);
    }

    private render(res: Response, view: string, data?: RenderingDataModel): void {
        res.render(view, data);
    }
}