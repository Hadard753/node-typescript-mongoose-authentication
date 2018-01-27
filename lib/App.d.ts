/// <reference types="express" />
import * as express from 'express';
export declare class App {
    express: express.Application;
    mongoose: any;
    constructor();
    init(port: string | number): void;
    private mountRoutes();
    private initDatabase(callback);
}
declare const _default: App;
export default _default;
