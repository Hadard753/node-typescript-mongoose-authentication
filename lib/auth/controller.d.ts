/// <reference types="express" />
import * as express from 'express';
export declare function register(req: express.Request, res: express.Response): void;
export declare function login(req: express.Request, res: express.Response): void;
export declare function getCurrentUser(req: express.Request, res: express.Response): void;
