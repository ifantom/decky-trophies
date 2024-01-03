// https://github.com/hulkrelax/deckfaqs/blob/0dbc26ebd19f4b6e1bc06e5b4c940b1ba77fed22/src/SteamClient.d.ts

// Non-exhaustive definition of the SteamClient that is available in the SP tab
// This object has a lot more properties/methods than are listed here
declare namespace SteamClient {
  const Apps: {
    GetMyAchievementsForApp(appId: string): Promise<{ data?: { rgAchievements?: Achievement[] } }>
  }
}

type Achievement = {
  bAchieved: boolean
  bHidden: boolean
  flAchieved: number
  flCurrentProgress: number
  flMaxProgress: number
  flMinProgress: number
  rtUnlocked: number
  strDescription: string
  strID: string
  strImage: string
  strName: string
}


