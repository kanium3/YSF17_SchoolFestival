export function hasOnlyKatakana(string_: string): boolean {
  return /^[\u30A1-\u30FF]+|[\uFF66-\uFF9F]+$/.test(string_)
}

export function hasKatakana(string_: string): boolean {
  return string_.match(/[\u30A1-\u30FF]|[\uFF66-\uFF9F]/) !== null
}

export function hasOnlyKanji(string_: string): boolean {
  return /^[\u2E80-\u2FD5]+|[\u3400-\u9FFF]+$/.test(string_)
}

export function hasKanji(string_: string): boolean {
  return string_.match(/[\u2E80-\u2FD5]+|[\u3400-\u9FFF]/) !== null
}

export function hasOnlyHiragana(string_: string): boolean {
  return /^[\u3031-\u309F]+$/.test(string_)
}

// Written by ChatGPT
export function hankakuKanaToZenkakuKatakana(input: string): string {
  // 半角カナ・半角記号のUnicode範囲 U+FF61–U+FF9F を塊で拾う
  return input == undefined
    ? ''
    : input.replaceAll(/[\uFF61-\uFF9F]+/g, segment => segment.normalize('NFKC'))
}
export function zenkakuAlphaToHankakuAlpha(input: string): string {
  return input == undefined
    ? ''
    : input.replaceAll(/[Ａ-Ｚａ-ｚ]+|[０-９]+/g, (ch) => {
        const code = ch.codePointAt(0)
        return code === undefined ? '' : String.fromCodePoint(code - 0xFE_E0)
      },
      )
}
export function extractAlphaNumber(input: string): string {
  if (input == undefined) {
    return ''
  }
  else {
    const matches = input.match(/[A-Za-z0-9Ａ-Ｚａ-ｚ０-９]/g)
    return matches ? matches.join('') : ''
  }
}

export function kanaToHira(string_: string): string {
  return string_ == undefined
    ? ''
    : string_.replaceAll(/[\u30A0-\u30FF]/g, function (match) {
        const code = match.codePointAt(0)
        const chr = code === undefined ? 0 : code - 0x60
        return String.fromCodePoint(chr)
      })
}
