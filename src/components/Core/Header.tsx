import ThemeButton from "../Micros/ThemeButton";

export default function Header() {
  return (
    <header className="relative">
      <h1 className="py-10 dark:text-white text-center text-6xl select-none">
        Welcome to AI Char Maker!
      </h1>
      <ThemeButton />
    </header>
  );
}
