export function hasOnlyKatakana(string_) {
  return /^[\u30A1-\u30FF]+|[\uFF66-\uFF9F]+$/.test(string_)
}

export function hasOnlyKanji(string_) {
  return /^[\u2E80-\u9FFF]+$/.test(string_)
}

export function hasOnlyHiragana(string_) {
  return /^[\u3031-\u309F]+$/.test(string_)
}
