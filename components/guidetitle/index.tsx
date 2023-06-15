export function Title({title, description, date}: {title: string, description: string, date: string}) {
  return (
    <div className="pt-5 pb-2">
      <h1
        className="font-mono nx-mt-2 nx-text-4xl nx-font-bold nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100"
        style={{ marginBottom: "0 !important" }}
      >
        {title}
      </h1>

      <p
        className="mb-4 pl-6 text-center text-slate-500 dark:text-slate-400"
        style={{ lineHeight: "1.7rem" }}
      >
        {description}
      </p>

      <br />

      <div className="text-sm pb-3 text-center text-gray-500 dark:text-gray-400 w-full border-b border-gray-400 authors border-opacity-20">
        {date}
      </div>
    </div>
  );
}
