"use strict"

import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import Dictionary from './Dictionary';
import Pair from './Pair';

import HttpResponse from '../models/http/HttpResponse';
import OkResponse from '../models/http/OkResponse';
import BadRequestResponse from '../models/http/BadRequestResponse';
import UnauthorizedResponse from '../models/http/UnauthorizedResponse';
import NotFoundResponse from '../models/http/NotFoundResponse';
import InternalServerErrorResponse from '../models/http/InternalServerErrorResponse';
import UnknownResponse from '../models/http/UnknownResponse';
import HttpClientConfigs from "../models/configs/HttpClientConfigs";
import Tools from "./Tools";

const axios = require('axios');

export default class HttpClientWrapper {
    configs: HttpClientConfigs;
    client: AxiosInstance;

    constructor(configs?: HttpClientConfigs, headers?: Dictionary) {
        this.configs = configs || new HttpClientConfigs();

        this.client = axios.create({
            baseURL: `${this.configs.protocol}${this.configs.host}`,
            timeout: 30000
        });
        if (headers)
            headers.forEach((header: Pair) => {
                this.client.defaults.headers.common[header.key] = header.value;
            });

    }

    get(endpoint: string, auth?: string): Promise<HttpResponse> {
        return new Promise<HttpResponse>((resolve, reject) => {
            try {
                let opts: AxiosRequestConfig = axios.defaults;

                if (!Tools.isNullOrUndefined(auth))
                    opts.headers['Authorization'] = `Basic ${decodeURIComponent(auth as string)}`;

                this.client.get(endpoint, opts).then((response: AxiosResponse<any>) => {
                    console.log(`[HttpClient.get.then] ${response.status}`);
                    resolve(HttpClientWrapper.GetResponse(response.status, response.data));
                }).catch((error: any) => {
                    console.error(`[HttpClient.get.catch] ${error}`);
                    reject(new InternalServerErrorResponse());
                });
            } catch (error) {
                console.error(`[HttpClient.get.exception]`);
                reject(new InternalServerErrorResponse());
            }
        });
    }

    post(endpoint: string, data: any, auth?: string): Promise<HttpResponse> {
        return new Promise<HttpResponse>((resolve, reject) => {
            try {
                let opts: AxiosRequestConfig = axios.defaults;

                if (!Tools.isNullOrUndefined(auth))
                    opts.headers['Authorization'] = `Basic ${decodeURIComponent(auth as string)}`;

                this.client.post(endpoint, JSON.stringify(data), opts).then((response: AxiosResponse<any>) => {
                    console.log(`[HttpClient.post.then] ${response.status}`);
                    resolve(HttpClientWrapper.GetResponse(response.status, response.data));
                }).catch((error: any) => {
                    console.error(`[HttpClient.post.catch] ${error}`);
                    reject(new InternalServerErrorResponse());
                });
            } catch (error) {
                console.error(`[HttpClient.post.exception] ${error}`);
                reject(new InternalServerErrorResponse());
            }
        });
    }

    private static GetResponse(statusCode: number, body?: any) {
        switch(statusCode) {
            case 200:
                return new OkResponse(body);
            case 400:
                return new BadRequestResponse(body);
            case 401:
                return new UnauthorizedResponse(body);
            case 404:
                return new NotFoundResponse(body);
            case 500:
                return new InternalServerErrorResponse(body);
            default:
                return new UnknownResponse(statusCode, body);
        }
    }
}