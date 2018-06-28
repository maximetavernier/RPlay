import NodeRSA = require('node-rsa');

export default class EncryptionService {
    private key: NodeRSA;

    constructor() {
        this.key = new NodeRSA({b: 2048});
        this.key.setOptions({
            environment: 'node',
            encryptionScheme: 'pkcs1',
            signingScheme: 'pkcs1-sha256'
        });
    }

    public Decode(token: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                resolve(this.key.decryptPublic(token, 'utf8'));
            } catch {
                reject();
            }
        });
    }

    public Encode(text: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                resolve(this.key.encryptPrivate(text, 'base64'));
            } catch {
                reject();
            }
        });
    }
}