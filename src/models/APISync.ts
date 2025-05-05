import axios, { AxiosPromise } from 'axios';
import { ISync } from './Model';

interface hasID {
    id?: string;
}

export class APISync<T extends hasID> implements ISync<T> {

    constructor(public rootURL: string) {}

    fetch(id: string): AxiosPromise {
        return axios.get(`${this.rootURL}/${id}`);
     }
 
    save(data: T): AxiosPromise {
         const { id }= data;
 
         if (id) {
            return axios.put(`${this.rootURL}/${id}`, data);
         }
         else {
             return axios.post(`${this.rootURL}`, data);
         }
     }
}