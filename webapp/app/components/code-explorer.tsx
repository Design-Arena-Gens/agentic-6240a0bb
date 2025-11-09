"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import tasks, {
  ProgrammingLanguage,
  TemplateContext,
  supportedLanguages,
} from "@/lib/code-templates";

const languageLabels: Record<ProgrammingLanguage, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  python: "Python",
  go: "Go",
  java: "Java",
};

const formatLanguage = (language: ProgrammingLanguage) => languageLabels[language] ?? language;

const formatTag = (tag: string) => tag.replace(/-/g, " ");

const initialTaskId = tasks[0]?.id;

export default function CodeExplorer() {
  const [selectedTaskId, setSelectedTaskId] = useState<string>(initialTaskId);
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>("typescript");
  const [includeComments, setIncludeComments] = useState<boolean>(true);
  const [preferAsyncFlows, setPreferAsyncFlows] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedTask = useMemo(() => {
    return tasks.find((task) => task.id === selectedTaskId) ?? tasks[0];
  }, [selectedTaskId]);

  const availableLanguages = useMemo(() => {
    return supportedLanguages.filter((language) => Boolean(selectedTask.languages[language]));
  }, [selectedTask]);

  useEffect(() => {
    if (!availableLanguages.includes(selectedLanguage)) {
      setSelectedLanguage(availableLanguages[0]);
    }
  }, [availableLanguages, selectedLanguage]);

  const context: TemplateContext = useMemo(
    () => ({
      includeComments,
      isAsyncPreferred: preferAsyncFlows,
    }),
    [includeComments, preferAsyncFlows]
  );

  const templateFactory = selectedTask.languages[selectedLanguage];
  const template = templateFactory ? templateFactory(context) : undefined;

  const handleCopy = useCallback(async () => {
    if (!template) return;
    try {
      await navigator.clipboard.writeText(template.snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error("clipboard copy failed", error);
    }
  }, [template]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 py-16">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 px-8 py-12 text-white shadow-2xl shadow-slate-900/40">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-1 text-xs font-semibold tracking-wide text-slate-300">
          <span aria-hidden>⚙️</span>
          engineering toolkit
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Build-ready snippets for common engineering chores
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
          Explore curated implementations across languages. Flip on comments for teaching moments or
          strip them out when you need production-ready brevity. Every snippet ships with context,
          trade-offs, and quick adoption guidance.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-800/60 px-3 py-1">
            <span aria-hidden>📦</span> Multi-language templates
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-800/60 px-3 py-1">
            <span aria-hidden>🧠</span> Complexity cheatsheets
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-800/60 px-3 py-1">
            <span aria-hidden>⚡️</span> Production-ready patterns
          </span>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[1.2fr_2fr]">
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-300/20">
            <header className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Pick a task</h2>
              <span className="text-xs uppercase tracking-wide text-slate-400">
                {tasks.length} templates
              </span>
            </header>
            <div className="mt-4 space-y-3">
              {tasks.map((task) => {
                const isActive = task.id === selectedTask.id;
                return (
                  <button
                    key={task.id}
                    onClick={() => setSelectedTaskId(task.id)}
                    className={[
                      "w-full rounded-xl border px-4 py-3 text-left transition",
                      isActive
                        ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/30"
                        : "border-slate-200 hover:border-slate-900/60 hover:bg-slate-900/5",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{task.title}</span>
                      <span className="text-xs font-mono uppercase text-slate-400">
                        {task.tags[0]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500 line-clamp-2">{task.summary}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-300/20">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Output preferences
            </h3>
            <div className="mt-4 space-y-3">
              <label className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-2 text-sm">
                <span>
                  Inline comments
                  <p className="text-xs text-slate-500">Toggle to include learning annotations.</p>
                </span>
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-slate-900"
                  checked={includeComments}
                  onChange={(event) => setIncludeComments(event.target.checked)}
                />
              </label>
              <label className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-2 text-sm">
                <span>
                  Prefer async flow
                  <p className="text-xs text-slate-500">
                    Influences templates where sync/async options exist.
                  </p>
                </span>
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-slate-900"
                  checked={preferAsyncFlows}
                  onChange={(event) => setPreferAsyncFlows(event.target.checked)}
                />
              </label>
            </div>
          </div>
        </aside>

        <article className="flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/20">
            <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs uppercase tracking-wide text-slate-500">
                  {selectedTask.tags.map((tag) => formatTag(tag)).join(" · ")}
                </span>
                <h2 className="text-2xl font-semibold text-slate-900">{selectedTask.title}</h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  {selectedTask.recommendedUse}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {availableLanguages.map((language) => {
                  const isActive = language === selectedLanguage;
                  return (
                    <button
                      key={language}
                      onClick={() => setSelectedLanguage(language)}
                      className={[
                        "rounded-full border px-4 py-2 text-sm font-medium transition",
                        isActive
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-900/40 hover:text-slate-900",
                      ].join(" ")}
                    >
                      {formatLanguage(language)}
                    </button>
                  );
                })}
              </div>
            </header>

            {template ? (
              <div className="mt-6 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wide text-slate-400">
                      Complexity
                    </p>
                    <p className="text-sm font-semibold text-slate-700">{template.complexity}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-900/40 hover:text-slate-900"
                    >
                      {copied ? "Copied" : "Copy snippet"}
                      <span aria-hidden>{copied ? "✅" : "📋"}</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-900/80 bg-slate-950 p-6 text-sm text-slate-100 shadow-inner shadow-slate-900/50">
                  <pre className="overflow-x-auto whitespace-pre text-xs leading-6">
                    <code>{template.snippet}</code>
                  </pre>
                </div>

                <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Implementation notes
                    </h3>
                    <p className="mt-3 text-sm text-slate-600">{template.explanation}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Ship checklist
                    </h3>
                    <ol className="mt-4 space-y-2 text-sm text-slate-600">
                      {template.steps.map((step, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </section>
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
                Template not yet available for {formatLanguage(selectedLanguage)}. Choose another
                language to preview the implementation.
              </div>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
