import { create } from "zustand";

interface UIStore {
    // Theme
    isDarkMode: boolean;
    toggleDarkMode: () => void;

    // Loading states
    isLoading: boolean;
    setLoading: (loading: boolean) => void;

    // Modal states
    activeModal: string | null;
    openModal: (modal: string) => void;
    closeModal: () => void;

    // Mobile menu
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    closeMobileMenu: () => void;

    // Scroll position
    scrollY: number;
    setScrollY: (y: number) => void;

    // Sound effects
    isSoundEnabled: boolean;
    toggleSound: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
    // Theme defaults
    isDarkMode: true,
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

    // Loading
    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading }),

    // Modal
    activeModal: null,
    openModal: (modal) => set({ activeModal: modal }),
    closeModal: () => set({ activeModal: null }),

    // Mobile menu
    isMobileMenuOpen: false,
    toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    closeMobileMenu: () => set({ isMobileMenuOpen: false }),

    // Scroll
    scrollY: 0,
    setScrollY: (y) => set({ scrollY: y }),

    // Sound
    isSoundEnabled: false,
    toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
}));
