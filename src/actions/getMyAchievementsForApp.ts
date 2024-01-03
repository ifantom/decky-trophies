export async function getMyAchievementsForApp(appId: string): Promise<Achievement[]> {
  return SteamClient.Apps.GetMyAchievementsForApp(appId).then(
    (response) => response.data?.rgAchievements ?? [],
    () => Promise.resolve([])
  )
}
