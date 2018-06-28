import JwtPayload from '../models/access/JwtPayload';
import * as fs from 'fs';
import Constants from '../Constants';
import Dictionary from '../lib/Dictionary';
import Pair from "../lib/Pair";
import Path from "../lib/Path";

const jwt = require('jsonwebtoken');

export default class JwtService {
    private keys: Dictionary;
    private passphrase: string;

    constructor() {
        this.keys = new Dictionary([
            new Pair('private', fs.readFileSync(Path.combine(Constants['KeysDirPath'], Constants['EncryptionPrivateKey']))),
            new Pair('public', fs.readFileSync(Path.combine(Constants['KeysDirPath'], Constants['DecryptionPublicKey'])))
        ]);
        this.passphrase = 'l3k1osk3';
    }

    public Decode(token: string): Promise<JwtPayload> {
        return new Promise<JwtPayload>((resolve, reject) => {
            try {
                jwt.verify(token, this.keys['public'], { algorithms: ['RS256'] }, (err: any, decoded: object | string) => {
                    if (err) {
                        console.error(`[JwtService.Decode] ${err.message}`);
                        reject();
                    } else {
                        resolve(decoded as JwtPayload);
                    }
                });
            } catch {
                reject();
            }
        });
    }

    public Encode(payload: JwtPayload): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try
            {
                jwt.sign(payload, { key: this.keys['private'], passphrase: this.passphrase }, { algorithm: 'RS256' }, (err: Error, encoded: string) => {
                    if (err) {
                        console.error(`[JwtService.Encode] ${err.message}`);
                        reject();
                    } else {
                        resolve(encoded);
                    }
                });
            } catch {
                reject();
            }
        })
    }

    public GeneratePayload(username: string, auth: string): JwtPayload {
        let now = new Date();
        now.setDate(now.getDate() + 7);
        let payload: JwtPayload = {
            username: username,
            auth: auth,
            exp: now.getTime(),
        };
        return payload;
    }
}