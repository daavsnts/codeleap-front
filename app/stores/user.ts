import { create } from "zustand";

type UserStore = {
	currentUsername: string;
	setCurrentUsername: (name: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
	currentUsername: "",
	setCurrentUsername: (currentUsername) => set({ currentUsername }),
}));
