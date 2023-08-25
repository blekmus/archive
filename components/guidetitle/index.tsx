export function Title({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date: string;
}) {
  return (
    <div className="pt-5 pb-2">
      <h1 className="nx-mt-2 nx-text-4xl nx-font-semibold nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100">
        {title}
      </h1>

      <p className="pl-6 text-center text-slate-500 dark:text-slate-400 guide_page_title_description">
        {description}
      </p>

      <br />

      <div className="text-sm pb-3 text-center text-slate-500 dark:text-slate-400 w-full border-b border-gray-400 authors border-opacity-20">
        {date}
      </div>
    </div>
  );
}
