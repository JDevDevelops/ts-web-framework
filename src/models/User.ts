import { Model } from "./Model";
import { APISync } from "./APISync";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Collection } from "./Collection";

export interface UserProps {
    id?: string;
    name?: string;
    age?: number;
}

const rootURL = 'http://localhost:3000/users';

export class User extends Model<UserProps>{
    static build(attrib: UserProps): User {
        return new User(
            new Eventing(),
            new Attributes<UserProps>(attrib),
            new APISync<UserProps>(rootURL)
        )
    }

    static buildCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(
            rootURL,
            (json: UserProps) => User.build(json)
        );
    }
}