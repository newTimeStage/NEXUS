declare module 'chinese-lunar-calendar' {
  export interface LunarDate {
    lunarYear: string;
    lunarMonth: number;
    lunarDate: number;
    isLeap: boolean;
    solarTerm?: string;
    zodiac?: string;
    dateStr?: string;
  }

  export function getLunar(year: number, month: number, date: number): LunarDate;
}