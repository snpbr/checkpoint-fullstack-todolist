// export class User {}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // On s'assure que chaque email est unique dans la base de données
  email: string;

  @Column()
  password?: string; // Le '?' et le `select: false` sont des mesures de sécurité
}
