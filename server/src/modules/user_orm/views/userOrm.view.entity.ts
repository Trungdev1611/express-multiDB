import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  expression: `
       select "firstName" as name_first, "lastName" as name_last, created_at from user_orm
    `,
})
export class UserOrmView {
  @ViewColumn()
  name_first: string;

  @ViewColumn()
  name_last: string;

  @ViewColumn()
  created_at: Date;
}
