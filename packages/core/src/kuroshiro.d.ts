declare module 'kuroshiro' {
  export class Kuroshiro {
    init(analyzer: any): Promise<void>
    convert(text: string, options?: any): Promise<string>
  }
  export function hasKatakana(text: string): boolean
  export function hasKanji(text: string): boolean
}
