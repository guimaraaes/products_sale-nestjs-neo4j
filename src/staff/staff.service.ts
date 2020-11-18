import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaff } from './dto/staff.dt';
import { Neo4jService } from 'nest-neo4j';
import {Staff} from './entity/staff.entity'
@Injectable()
export class StaffService {
    constructor(
        private readonly neo4jService: Neo4jService
    ){}

    async findAll(){
        const foundstaff =  await this.neo4jService.read(`
            MATCH (st:Staff)=[:WORKS_ON]->(S:Stoke)
            RETURN  st, 
                    st.name as name, 
                    st.department as department, 
                    st.e_mail as e_mail, 
                    st.password as password,
                    S
        `).then(res => {
            const staff = res.records.map(row => {
                return new Staff(
                    row.get('st'),
                    row.get('S'),
                    row.get('name'),
                    row.get('department'), 
                    row.get('e_mail'),
                    row.get('password')
                )
            })
            return staff.map(a => a)
        })
        if (foundstaff.length == 0){
            return {message: 'none staff'}
        }
        return foundstaff
    }

    async create(staff: CreateStaff, idStoke: number){
        const response = await this.neo4jService.write(`
            MATCH (S:Stoke) WHERE id(S) = $id_stoke
            MERGE (st:Staff 
                    {name: $staff_proper.name, 
                    cpf: $staff_proper.cpf, 
                    adress: $staff_proper.adress})-[:WORKS_ON]->(S)
            RETURN  st, 
                    st.name as name, 
                    st.department as department, 
                    st.e_mail as e_mail, 
                    st.password as password,
                    S
        `, {
            staff_proper: staff, id_stoke:idStoke
        })
        .then(res => {
            const row = res.records[0]
            return new Staff(
                row.get('st'),
                row.get('S'),
                row.get('name'),
                row.get('department'), 
                row.get('e_mail'),
                row.get('password')
            )
        });
        return response
    }


    async getId(idStaff: number): Promise<Staff[]>{
        const found =  await this.neo4jService.read(`
            MATCH (st:Staff)-[:WORKS_ON]->(S:Stoke) WHERE id(c) = toInteger($id_staff)
            RETURN  st, 
                    st.name as name, 
                    st.department as department, 
                    st.e_mail as e_mail, 
                    st.password as password,
                    S
        `, {
            id_staff: idStaff
        }).then(res => {
            const staff = res.records.map(row => {
                return new Staff(
                    row.get('st'),
                    row.get('S'),
                    row.get('name'),
                    row.get('department'), 
                    row.get('e_mail'),
                    row.get('password')
                )
            })
            return staff.map(a => a)
        })
        if (found.length == 0){
            throw new NotFoundException('city not found')
        }
        return found
    }
}
