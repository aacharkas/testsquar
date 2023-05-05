export class Logger {
  constructor(private readonly name: string) {}

  log(message: unknown) {
    console.log(`\x1b[32m[${this.name}]:\x1b[0m ${message}`);
  }

  warn(message: unknown) {
    console.warn(`\x1b[33m[${this.name}]:\x1b[0m ${message}`);
  }

  error(message: unknown) {
    console.error(`\x1b[31m[${this.name}]:\x1b[0m ${message}`);
  }

  dir(object: object, level: 'log' | 'warn' | 'error') {
    this[level]('');
    console.dir(object, { sorted: true, colors: true });
  }
}
