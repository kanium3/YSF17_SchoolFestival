declare module 'kuroshiro-analyzer-kuromoji' {
  class KuromojiAnalyzer {
    constructor(options?: any)
    init(): Promise<void>
    tokenize(text: string): any[]
  }
  export default KuromojiAnalyzer
}
