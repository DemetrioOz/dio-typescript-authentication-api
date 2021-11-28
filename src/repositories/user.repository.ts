import db from "../db";
import User from "../models/user.model";

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    try {
      const query = `SELECT uuid, username FROM application_user`;

      let result = await db.query<User>(query);

      const rows = result.rows;

      return rows || [];
    } catch (error) {
      throw error;
    }
  }

  async findById(uuid: string): Promise<User> {
    const query = `SELECT uuid, username 
    FROM application_user 
    WHERE uuid = $1
    `;

    const values = [uuid];

    const { rows } = await db.query<User>(query, values);
    const [user] = rows;

    return user;
  }

  async create(user: User): Promise<String> {
    const script = `
    INSERT INTO application_user (
      username,
      password
  )
  VALUES ($1, crypt($2, 'my_salt'))
  RETURNING uuid
  `;

    const values = [user.username, user.password];

    const { rows } = await db.query<{ uuid: string }>(script, values);
    const [newUser] = rows;

    return newUser.uuid;
  }

  async update(user: User): Promise<Object> {
    const script = `
    UPDATE application_user 
    SET 
      username = $1,
      password = crypt($2, 'my_salt')
    WHERE uuid = $3
    RETURNING username, uuid
    `;

    const values = [user.username, user.password, user.uuid];

    const { rows } = await db.query<{ uuid: string }>(script, values);
    const [newUser] = rows;

    return newUser;
  }

  async remove(uuid: string): Promise<void> {
    const script = `
      DELETE
      FROM application_user
      WHERE uuid = $1
    `;

    const values = [uuid];

    await db.query(script, values);
  }
}

export default new UserRepository();
