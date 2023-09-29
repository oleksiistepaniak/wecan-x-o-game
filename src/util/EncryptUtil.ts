import * as bcrypt from 'bcrypt';

export class EncryptUtil {
    private static SALT: number = 10;

    private constructor() {
    }

    public static async hashPassword(password: string) {
       return await bcrypt.hash(password, this.SALT);
    }

    public static async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}