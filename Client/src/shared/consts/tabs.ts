export const TABS = {
    PROFILE: "Profile",
    SECURITY: "Security",
    // PREFERENCES: "Preferences"
} as const;

export type TabsType = typeof TABS[keyof typeof TABS];