import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Generated, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'news',
})
export class News {
  @PrimaryColumn({
    type: "integer"
  })
  @Generated("increment")
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Column({
    type: 'json',
  })
  keywords: string[];

  @Column({
    type: 'text',
  })
  body: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date;
}
