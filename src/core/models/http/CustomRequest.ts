'use strict';

import { Request } from 'express';
import ApiAuth from '../access/ApiAuth';

export default interface CustomRequest extends Request {
    auth?: ApiAuth;
    locale: string;
}
