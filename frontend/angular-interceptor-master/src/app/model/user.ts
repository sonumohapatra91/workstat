export class User {
    id: number;
    username: string;
    password: string;
    roles: string;
    token?: string;

    constructor(
        public status: string,
      ) { }
    
}