import {Request} from "express"
import UserToken from "./UserToken"

export default interface RequestUser extends Request {
    user: UserToken;
}