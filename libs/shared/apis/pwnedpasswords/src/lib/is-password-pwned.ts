import axios from 'axios';
import crypto from 'node:crypto';

// TODO: add logger, but before it solve circular dependencies
export async function isPasswordPwned(password: string): Promise<boolean> {
  try {
    const shasum = crypto.createHash('sha1');
    const hash = shasum.update(password).digest('hex');
    const first5Char = hash.slice(0, 5);
    const remainingChar = hash.slice(5);
    const res = await axios.get(
      `https://api.pwnedpasswords.com/range/${first5Char}`,
      {
        timeout: 400,
      }
    );

    const data = res.data.split('\r\n').map((el: string) => el.split(':'));
    const isFound = data.findIndex(
      (e: [string, string]) => e[0] === remainingChar.toUpperCase()
    );

    return !!~isFound;
  } catch (e) {
    return false;
  }
}
