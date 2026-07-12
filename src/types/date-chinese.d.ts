declare module 'date-chinese' {
  export class Lunar {
    constructor(year: number, month: number, day: number);
    getMonth(): number;
    getDay(): number;
  }
}
