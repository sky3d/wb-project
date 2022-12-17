import { Entity, Column, Index } from 'typeorm'
import { AbstractBaseEntity } from './baseEntity'

@Entity()
export class Token extends AbstractBaseEntity {
    @Index()
    @Column({ name: 'social_id' })
    public socialId: string

    @Column({ name: 'refresh_token' })
    public refreshToken: string
}
