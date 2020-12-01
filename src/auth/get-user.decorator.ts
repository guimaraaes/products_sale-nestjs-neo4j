import { createParamDecorator } from "@nestjs/common";
import { Staff } from "src/staff/entity/staff.entity";
// import { Staff } from "./dto/auth.dto";


export const GetUser = createParamDecorator((data, req): Staff => {
    return req.staff
})