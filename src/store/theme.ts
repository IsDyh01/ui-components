import { defineStore } from "pinia";
import { ref } from "vue";

const useThemeStore = defineStore("theme", () => {
  const theme = ref<string>(localStorage.getItem("theme")!);
  const changeTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    localStorage.setItem("theme", theme.value);
  };
  return {
    theme,
    changeTheme,
  };
});

export default useThemeStore;
