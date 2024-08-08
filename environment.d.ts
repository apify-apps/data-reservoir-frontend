declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES: string,
      NEXT_PUBLIC_API: string
    }
  }
}

export {}