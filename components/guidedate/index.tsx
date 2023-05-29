import { ReactNode } from "react";

export function Date({
  children,
  update = null,
}: {
  children: ReactNode;
  update?: string;
}) {
  return (
    <div className="text-sm pb-3 text-center text-gray-500 dark:text-gray-400 w-full border-b border-gray-400 authors border-opacity-20">
      {children}

      {update != null && (
        <div className="text-xs mt-1 text-center">Last updated {update}</div>
      )}
    </div>
  );
}