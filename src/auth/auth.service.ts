import { Injectable, UnauthorizedException, BadGatewayException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface';
import { Credential, CreateStaff } from './dto/auth.dto'
import * as bcrypt from 'bcrypt';
import { Neo4jService } from 'nest-neo4j';
import { Staff } from 'src/staff/entity/staff.entity';
import { validate } from 'class-validator';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly neo4jService: Neo4jService

    ) { }

    async singUp(staff: CreateStaff): Promise<any> {
        const { name, department, e_mail, password, city, stoke } = staff

        if (await this.findOne(e_mail))
            return new BadGatewayException('email aready exist')

        const user = new CreateStaff();
        user.name = name;
        user.department = department;
        user.e_mail = e_mail;
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);
        user.city = city;
        user.stoke = stoke;

        return await this.neo4jService.write(`
            OPTIONAL MATCH (:City2)<-[rC:LIVES_ON]-(S:Staff2 {name: $staff_proper.name, 
                                                                department: $staff_proper.department,
                                                                e_mail: $staff_proper.e_mail,
                                                                salt: $staff_proper.salt,
                                                                password: $staff_proper.password})-[rS:WORKS_ON]->(:Stoke2)
            DELETE rC, rS

            MERGE(ctS:City2 {name: $stokeCity_proper.name, 
                state: $stokeCity_proper.state, 
                country: $stokeCity_proper.country})
            WITH ctS

            MERGE (S:Stoke2 { name:$stoke_proper.name })-[:LOCALED_IN]->(ctS)
            WITH S

            MERGE (st:Staff2 {name: $staff_proper.name, 
                                department: $staff_proper.department,
                                e_mail: $staff_proper.e_mail,
                                salt: $staff_proper.salt,
                                password: $staff_proper.password})
            WITH st, S

            MERGE (ct:City2 {name: $city_proper.name, 
                        state: $city_proper.state, 
                        country: $city_proper.country})
            WITH st, ct, S

            MERGE (ct)<-[:LIVES_ON]-(st)-[:WORKS_ON {since: 'DEFAULT', sum_quantity_sale: 0, sales_count: 0 }]->(S)

            RETURN  st, 
                    st.name as name, 
                    st.department as department, 
                    st.e_mail as e_mail, 
                    st.password as password 
        `, {
            staff_proper: user,
            stoke_proper: user.stoke,
            stokeCity_proper: user.stoke.city,
            city_proper: user.city,
        }).then(res => {
            const row = res.records[0]
            return res.records.length > 0 ?
                new Staff(
                    row.get('st'),
                    row.get('name'),
                    row.get('department'),
                    row.get('e_mail'),
                    row.get('password')
                ) : new BadGatewayException('error on create staff')
        });
    }


    async singIn(credentials: Credential): Promise<any> {
        const e_mail = await this.validateUserPassword(credentials)
        if (!e_mail)
            throw new UnauthorizedException('Invalida Credentials')
        const payload: JwtPayload = { e_mail }
        const acessToken = await this.jwtService.sign(payload)
        return { acessToken }
    }

    async validateUserPassword(credentials: Credential): Promise<string> {
        const { e_mail, password } = credentials
        const user = await this.findOne(e_mail)

        if (user && (await user.validPassword(password)))
            return user.e_mail
        return null
    }

    async findOne(e_mail: string): Promise<CreateStaff> {
        return await this.neo4jService.write(`
            MATCH (st:Staff2 {e_mail: $staff_proper})
            RETURN  st, 
                    st.name as name, 
                    st.department as department, 
                    st.e_mail as e_mail, 
                    st.salt as salt, 
                    st.password as password
        `, { staff_proper: e_mail }).then(res => {
            const row = res.records[0]
            const user = new CreateStaff()
            res.records.length > 0 ? (
                user.name = row.get('name'),
                user.department = row.get('department'),
                user.e_mail = row.get('e_mail'),
                user.salt = row.get('salt'),
                user.password = row.get('password')
            ) : null
            return res.records.length > 0 ?
                user : null
        });
    }

}
