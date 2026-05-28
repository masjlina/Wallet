const TABS = {
    PROFILE: "Profile",
    SECURITY: "Security",
    // PREFERENCES: "Preferences"
} as const;

export type TABS = typeof TABS[keyof typeof TABS];
