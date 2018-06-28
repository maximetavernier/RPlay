'use strict';

import { Response } from 'express';
import Constants from '../../core/Constants';
import Path from '../../core/lib/Path';
import ServerConfigs from '../../core/models/configs/ServerConfigs';
import CustomRequest from '../../core/models/http/CustomRequest';

import IController from './IController';

export default class Root extends IController {
    constructor(servConfigs: ServerConfigs) {
        super(servConfigs);
    }

    protected init(): void {
        this.router.get('/', this.root.bind(this));
        this.router.get('/robots.txt', this.robot.bind(this));
        this.router.get('/login', this.login.bind(this));
    }

    private root(req: CustomRequest | null, res: Response | null, _next: any): void {
        if (req && res) {
            res.render('index');
        }
    }

    private robot(req: CustomRequest | null, res: Response | null, _next: any): void {
        if (req && res)
            res.sendFile(Path.combine(Constants['ConfigDirPath'], Constants['RobotsFile']));
    }

    private login(req: CustomRequest | null, res: Response | null, _next: any): void {
        if (req && res) {

        }
    }
}