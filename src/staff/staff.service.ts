import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { Staff } from './entity/staff.entity'
@Injectable()
export class StaffService {
    constructor(
        private readonly neo4jService: Neo4jService
    ) { }

    async findAll(idStoke: number) {
        return await this.neo4jService.read(`
            MATCH (st:Staff)-[:WORKS_ON]->(S:Stoke) WHERE id(S) = toInteger($id_stoke)
            RETURN  st, 
                    st.name as name, 
                    st.department as department, 
                    st.e_mail as e_mail, 
                    st.password as password
        `, { id_stoke: idStoke }).then(res => {
            const staffs = res.records.map(row => {
                return new Staff(
                    row.get('st'),
                    row.get('name'),
                    row.get('department'),
                    row.get('e_mail'),
                    row.get('password')
                )
            })
            return staffs.length > 0 ? staffs.map(a => a)
                : new NotFoundException('staffs not found')
        })

    }

    // async create(staff: CreateStaff) {
    //     return await this.neo4jService.write(`
    //         OPTIONAL MATCH (:City)<-[rC:LIVES_ON]-(S:Staff {name: $staff_proper.name, department: $staff_proper.department})-[rS:WORKS_ON]->(:Stoke)
    //         DELETE rC, rS

    //         MERGE(ctS:City {name: $stokeCity_proper.name, 
    //             state: $stokeCity_proper.state, 
    //             country: $stokeCity_proper.country})
    //         WITH ctS

    //         MERGE (S:Stoke { name:$stoke_proper.name })-[:LOCALED_IN]->(ctS)
    //         WITH S

    //         MERGE (st:Staff {name: $staff_proper.name, department: $staff_proper.department})
    //         WITH st, S

    //         MERGE (ct:City {name: $city_proper.name, 
    //                     state: $city_proper.state, 
    //                     country: $city_proper.country})
    //         WITH st, ct, S

    //         MERGE (ct)<-[:LIVES_ON]-(st)-[:WORKS_ON {since: 'DEFAULT', sum_quantity_sale: 0, sales_count: 0 }]->(S)

    //         RETURN  st, 
    //                 st.name as name, 
    //                 st.department as department, 
    //                 st.e_mail as e_mail, 
    //                 st.password as password 
    //     `, {
    //         staff_proper: staff,
    //         stoke_proper: staff.stoke,
    //         stokeCity_proper: staff.stoke.city,
    //         city_proper: staff.city,
    //     }).then(res => {
    //         const row = res.records[0]
    //         return res.records.length > 0 ?
    //             new Staff(
    //                 row.get('st'),
    //                 row.get('name'),
    //                 row.get('department'),
    //                 row.get('e_mail'),
    //                 row.get('password')
    //             ) : new BadRequestException('error on create staff')
    //     });
    // }


    async findById(idStaff: number): Promise<any> {
        return await this.neo4jService.read(`
            MATCH (st:Staff)-[:WORKS_ON]->(S:Stoke) WHERE id(st) = toInteger($id_staff)
            RETURN  st, 
                    st.name as name, 
                    st.department as department, 
                    st.e_mail as e_mail, 
                    st.password as password 
        `, {
            id_staff: idStaff
        }).then(res => {
            const staff = res.records.map(row => {
                return new Staff(
                    row.get('st'),
                    row.get('name'),
                    row.get('department'),
                    row.get('e_mail'),
                    row.get('password')
                )
            })
            return staff.length > 0 ? staff.map(a => a)
                : new NotFoundException('staff not found')
        })
    }
}
