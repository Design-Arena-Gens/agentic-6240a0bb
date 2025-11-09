import CodeExplorer from "./components/code-explorer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="relative mx-auto w-full px-4 pb-24 pt-6 sm:px-8">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.16),_transparent_60%)]" />
        <CodeExplorer />
      </div>
    </main>
  );
}
