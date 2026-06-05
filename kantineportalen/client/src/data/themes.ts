import type { SeasonTheme } from '@/types/theme'

export const seasonThemes: Record<SeasonTheme['season'], SeasonTheme> = {
  spring: {
    season: 'spring',
    primary: '#4CAF50',
    secondary: '#A8E6A1',
  },
  summer: {
    season: 'summer',
    primary: '#2196F3',
    secondary: '#00BCD4',
  },
  autumn: {
    season: 'autumn',
    primary: '#E67E22',
    secondary: '#C0392B',
  },
  winter: {
    season: 'winter',
    primary: '#1E3A8A',
    secondary: '#A7C7E7',
  },
}

export const activeSeason = seasonThemes.summer
