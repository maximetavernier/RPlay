'use strict';

import { Response } from 'express';
import IInterceptor from './IInterceptor';
import ServerConfigs from '../../core/models/configs/ServerConfigs';
import CustomRequest from '../../core/models/http/CustomRequest';

export default class Locale extends IInterceptor {
    constructor(servConfigs: ServerConfigs) {
        super(servConfigs);
    }

    protected init(): void {
    }

    protected proxify(req: CustomRequest | null, _res: Response | null): void {
        if (req)
        {
            req.locale = 'fr';
            let accepted = req.acceptsLanguages('fr', 'en');
            if (accepted && accepted !== req.locale)
                req.locale = accepted;

            //req.i18n.setLocale(req.locale);
            console.log(`[Locale] Language : ${req.locale}`);
        } else
            this.status = 400;
    }
}