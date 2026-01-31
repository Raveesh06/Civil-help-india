// Consistent Color Theme for Civil Help India App
// Primary: Sky Blue (for navigation, primary actions)
// Secondary: Emerald (for positive/success states)
// Warning: Amber (for caution/medium urgency)
// Danger: Red (for high urgency/emergency)
// Neutral: Slate (for text, backgrounds, borders)

export const THEME = {
  // Primary Colors
  primary: {
    light: '#0EA5E9', // sky-500
    lighter: '#E0F2FE', // sky-50
    lightest: '#F0F9FF', // sky-100
    dark: '#0369A1', // sky-700
    darker: '#082F49', // sky-900
  },

  // Success/Positive
  success: {
    light: '#10B981', // emerald-500
    lighter: '#D1FAE5', // emerald-100
    dark: '#059669', // emerald-600
    darker: '#064E3B', // emerald-900
  },

  // Warning/Medium Urgency
  warning: {
    light: '#F59E0B', // amber-500
    lighter: '#FEF3C7', // amber-100
    lightest: '#FFFBEB', // amber-50
    dark: '#D97706', // amber-600
    darker: '#78350F', // amber-900
  },

  // Danger/High Urgency
  danger: {
    light: '#EF4444', // red-500
    lighter: '#FEE2E2', // red-100
    lightest: '#FEF2F2', // red-50
    dark: '#DC2626', // red-600
    darker: '#7F1D1D', // red-900
  },

  // Neutral/Text
  neutral: {
    text: {
      primary: '#111827', // gray-900
      secondary: '#4B5563', // gray-600
      light: '#9CA3AF', // gray-400
      lighter: '#D1D5DB', // gray-300
    },
    bg: {
      light: '#F9FAFB', // gray-50
      lighter: '#F3F4F6', // gray-100
      medium: '#E5E7EB', // gray-200
      dark: '#1F2937', // gray-800
      darker: '#111827', // gray-900
    },
  },

  // Dark Mode
  dark: {
    bg: {
      primary: '#1E293B', // slate-800
      secondary: '#0F172A', // slate-900
    },
    text: {
      primary: '#F1F5F9', // slate-100
      secondary: '#CBD5E1', // slate-300
    },
  },
};

// Tailwind class mappings for easy use
export const THEME_CLASSES = {
  // Buttons
  primaryButton: 'bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg',
  secondaryButton: 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-bold border border-sky-100 dark:border-slate-700 rounded-2xl hover:bg-sky-50 dark:hover:bg-slate-700 transition-all',
  dangerButton: 'bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg',

  // Cards
  card: 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm',
  cardHighlight: 'bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 rounded-3xl p-6',

  // Text
  textPrimary: 'text-gray-900 dark:text-white',
  textSecondary: 'text-gray-600 dark:text-gray-300',
  textLight: 'text-gray-500 dark:text-gray-400',

  // Input
  input: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-400 outline-none',

  // Backgrounds
  bgLight: 'bg-white dark:bg-slate-800',
  bgLighter: 'bg-gray-50 dark:bg-slate-900',
};
