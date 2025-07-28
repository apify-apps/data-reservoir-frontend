import { THE_SIMS_RARITY } from "@/constant/enums"

export type ITheSimsResponse = {
  'bustin-out-career': {
    id: string
    career: string
    level: number
    job: string
    description: string
    workStart: string
    workEnd: string
    friends: number
    salary: number
    promotion: number
    cooking: number
    mechanical: number
    charisma: number
    body: number
    logic: number
    creativity: number
  },
  'two-pets-console-career': {
    id: string
    career: string
    level: number
    job: string
    description: string
    workStart: string
    workEnd: string
    friends: number
    salary: number
    promotion: number
    cooking: number
    mechanical: number
    charisma: number
    body: number
    logic: number
    creativity: number
    cleanliness: number
  },
  'two-console-career': {
    id: string
    career: string
    level: number
    job: string
    description: string
    workStart: string
    workEnd: string
    friends: number
    salary: number
    promotion: number
    cooking: number
    mechanical: number
    charisma: number
    body: number
    logic: number
    creativity: number
    cleanliness: number
  },
  'castaway-product': {
    id: string
    name: string
    image: string
    eatenRaw: boolean
    hunger: number
    bladder: number
    energy: number
    category: string
    description: string
  },
  'three-pc-dish': {
    id: string
    name: string
    image: string
    category: string
    skill: number
    types?: string[],
    flavours?: string[],
    ingredients?: string[],
    isVegetarian: boolean
    notes: string
  },
  'three-pc-gem': {
    id: string
    image: string
    gemCut: {
      id: string
      name: string
      image: string
    }
    rawGem: {
      id: string
      name: string
      image: string
      rarity: number
    }
  },
  'two-pets-console-product': {
    id: string
    name: string
    image: string
    category: string
    energy: number
    hunger: number
    bladder: number
    description: string
    price: number
  },
  'four-pc-harvestable': {
    id: string
    name: string
    image: string
    rarity: THE_SIMS_RARITY
    baseValue: number
    perfectValue: number
    growthRate: number
    form: string
    verticalGarden: boolean
    description: string
  },
  'four-pc-element': {
    id: string
    name: string
    image: string
    rarity: number
    value: number
  },
  'four-pc-element-complete': {
    id: string
    name: string
    image: string
    rarity: number
    value: number
    metals: {
      id: string
      name: string
      image: string
    }[],
    crystals: {
      id: string
      name: string
      image: string
    }[]
  },
  'four-pc-metal': {
    id: string
    name: string
    image: string
    rarity: THE_SIMS_RARITY
    value: number,
    description: string
  },
  'four-pc-metal-complete': (ITheSimsResponse['four-pc-metal'] & {
    elements: {
      id: string
      name: string
      image: string
    }[]
  }),
  'four-pc-crystal': {
    id: string
    name: string
    image: string
    rarity: THE_SIMS_RARITY
    value: number,
    description: string,
    effect: string
  },
  'four-pc-crystal-complete': (ITheSimsResponse['four-pc-crystal'] & {
    elements: {
      id: string
      name: string
      image: string
    }[]
  }),
}