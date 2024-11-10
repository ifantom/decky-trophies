import Trophy from '../../types/Trophy'

export function getTrophy(progress: number): Trophy | undefined {
  if (progress) {
    if (progress === 100) return Trophy.Platinum
    if (progress > 66) return Trophy.Golden
    if (progress > 33) return Trophy.Silver
    if (progress > 0) return Trophy.Bronze
  }

  return undefined
}
