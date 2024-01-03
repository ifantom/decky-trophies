import Trophy from '../../types/Trophy'

export function getTrophy(total: number, achieved: number): Trophy | undefined {
  if (total && achieved) {
    const progress = (achieved / total) * 100

    if (progress === 100) return Trophy.Platinum
    if (progress > 66) return Trophy.Golden
    if (progress > 33) return Trophy.Silver
    if (progress > 0) return Trophy.Bronze
  }

  return undefined
}
