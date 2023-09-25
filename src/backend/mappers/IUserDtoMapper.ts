import {DtoMapper} from "./DtoMapper.ts";
import {IUserResponseParams} from "../dtos/IUserResponseParams.ts";
import {IUserRequestParams} from "../dtos/IUserRequestParams.ts";
import {IUser} from "../models/IUser.ts";

export class IUserDtoMapper implements DtoMapper<IUserResponseParams, IUserRequestParams, IUser> {
    constructor() {
    }

    mapToDto(model: IUser): IUserResponseParams {
        return {
            id: model.id,
        };
    }

    mapToModel(requestDto: IUserRequestParams): IUser {
        return {
            id: '0',
            username: requestDto.username,
            password: requestDto.password,
            numberOfVictories: 0,
        };
    }

}