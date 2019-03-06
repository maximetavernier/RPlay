'use strict';

import { Express } from 'express';

import Proxy from './interceptors/Proxy';
import Locale from './interceptors/Locale.cs';

import Map from './controllers/Map';
import Access from './controllers/Access';

import Constants from '../core/Constants';
import Path from '../core/lib/Path';

import ServerConfigs from '../core/models/configs/ServerConfigs';

import * as serveStatic from 'serve-static';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

class Service {
    // Program vars
    argc: number;
    argv: string[];
    env: string;

    // Server confs
    confs: ServerConfigs;
    configPrefix: string;

    // Express
    app: Express;

    constructor(process: NodeJS.Process) {
        this.argv = process.argv;
        this.argc = process.argv.length;
        this.env = process.env.ENV && (process.env.ENV ==='dev' || process.env.ENV === 'preprod' || process.env.ENV === 'prod')
            ? (process.env.ENV || 'local')
            : 'local';
        this.configPrefix = this.env === 'dev' || this.env === 'preprod' || this.env === 'prod'
            ? this.env
            : 'default';

        this.init();
    }

    private init(): void {
        this.confs = require(Path.combine(Constants.get('ConfigDirPath'), `${this.configPrefix}${Constants.get('ConfigExt')}${Constants.get('JsExt')}`));

        this.app = express();
        this.app.set('view engine', 'ejs');

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());

        // Config router by import
        this.importInterceptors();
        this.importControllers();
        this.importStatics();
    }

    main(): number {
        this.app.listen(this.confs.port, () => {
            console.log(`RPlay: Start listening...\n\tEnvironment: ${this.env}\n\tHost: ${this.confs.protocol}${this.confs.host}\n\tPort: ${this.confs.port}`);
        });
        return 0;
    }

    private importInterceptors(): void {
        this.app.use(new Proxy(this.confs).Interceptor());
        this.app.use(new Locale(this.confs).Interceptor());
    }

    private importControllers(): void {
        this.app.use(new Map(this.confs).Router());
        this.app.use(new Access(this.confs).Router())
    }

    private importStatics(): void {
        this.app.use(express.static(Constants.get('AssetsDirPath')));
        this.app.use(express.static(Constants.get('ScriptsDirPath')));
        this.app.use(express.static(Constants.get('JsDirPath')));
        this.app.use(express.static(Constants.get('StylesDirPath')));

        this.app.use(serveStatic(__dirname));
    }
}

new Service(process).main();