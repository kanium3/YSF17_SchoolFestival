import * as v from 'valibot'

const programType = {
  workshop: '体験',
  donation: '募金',
  sale: '販売',
  exhibition: '展示',
  performance: 'パフォーマンス',
  publishing: '出版',
  other: 'その他',
} as const

const ariaType = {
  'hall': 'ホール',
  'cafeteria': 'カフェテリア',
  'gym': '体育館',
  'rooftop': '屋上',
  '5F': '5F',
  '4F': '4F',
  '3F': '3F',
  '2F': '2F',
  '1F': '1F',
} as const

export const programSchema = v.object({
  id: v.pipe(v.string(), v.nonEmpty(), v.slug()),
  name: v.pipe(v.string(), v.nonEmpty()),
  team: v.pipe(v.string(), v.nonEmpty()),
  imagePath: v.optional(v.pipe(v.string(), v.nonEmpty())),
  programType: v.array(v.enum(programType)),
  aria: v.enum(ariaType),
  location: v.pipe(v.string(), v.nonEmpty(), v.description('教室や部屋の番号')),
  prText: v.optional(v.pipe(v.string(), v.nonEmpty())),
  tag: v.optional(v.array(v.pipe(v.string(), v.maxLength(20), v.description('企画に結びつくタグ')))),
  dates: v.pipe(v.array(v.pipe(v.string(), v.isoDate())), v.minLength(0), v.maxLength(3), v.description('企画を開催する日付の配列')),
})

export type ProgramData = v.InferInput<typeof programSchema>

// Tagsクラス
export class Tags extends Set<string> {
  constructor(init: string[]) {
    super(init)
  }

  // 指定したタグ集合がこの集合のスーパーセットか判定
  isSupersetOf(other: Tags): boolean {
    for (const tag of other) {
      if (!this.has(tag)) return false
    }
    return true
  }

  // 指定したタグ集合とこの集合が互いに素か判定
  isDisjointFrom(other: Tags): boolean {
    for (const tag of other) {
      if (this.has(tag)) return false
    }
    return true
  }
}

// Programクラス
export class Program {
  id: string
  name: string
  team: string
  location: string
  aria: string
  programType: string[]
  imagePath?: string
  prText?: string
  optionalTag?: string[]
  dates: Date[]

  constructor(option: ProgramData) {
    this.id = option.id
    this.name = option.name
    this.team = option.team
    this.location = option.location
    this.aria = option.aria
    this.programType = option.programType
    this.imagePath = option.imagePath
    this.prText = option.prText
    this.optionalTag = option.tag
    this.dates = option.dates.map(v => new Date(v))
  }

  /**
   * 企画に結びつくタグを返します。
   */
  get tags(): Tags {
    return new Tags([
      ...this.programType,
      this.aria,
      this.location,
      ...(this.optionalTag || []),
    ])
  }
}

// Programsクラス
export class Programs {
  programs: Set<Program>

  constructor(init?: Program[]) {
    this.programs = init ? new Set(init) : new Set()
  }

  /**
   * 指定したタグを含む企画を返します。
   * @param tags
   * @param is_complete すべてのタグが完全に一致したもののみを返すか
   */
  matchPrograms(tags: Tags, is_complete: boolean = false): Programs {
    const matchedPrograms = new Programs([])
    for (const program of this.programs) {
      const programTags = program.tags
      if (is_complete && tags.isSupersetOf(programTags)) {
        matchedPrograms.programs.add(program)
        continue
      }
      if (!tags.isDisjointFrom(programTags)) {
        matchedPrograms.programs.add(program)
      }
    }
    return matchedPrograms
  }

  /**
   * 企画のイテレータを返します。
   */
  iter(): IterableIterator<Program> {
    return this.programs.values()
  }
}

/**
 * 企画データのJSONをパースします
 */
export function parseProgramsData(input: string): Programs {
  const programsSchema = v.array(programSchema)
  const data = v.parse(programsSchema, input)
  return new Programs(data.map(programData => new Program(programData)))
}
