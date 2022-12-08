import cn from "clsx";
import Link from "next/link";

import styles from "./style.module.css";



// import { Card, Cards } from '@components/card'

// <Cards>
//   <Card icon={
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
// </svg>
//   } title="Callout" href="/docs/docs-theme/built-ins/callout">
//   </Card>
//   <Card icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
// </svg>} title="Tabs" href="/docs/docs-theme/built-ins/tabs">
//   </Card>
// </Cards>




export function Card({
  children,
  title,
  icon,
  image,
  arrow,
  demo,
  href,
  ...props
}) {
  const animatedArrow = arrow ? (
    <span
      className={cn(
        "transition-transform duration-75",
        "group-hover:translate-x-[2px]"
      )}
    >
      →
    </span>
  ) : null;

  if (image) {
    return (
      <Link
        href={href}
        className={cn(
          styles.card,
          "group flex flex-col justify-start overflow-hidden rounded-lg border border-gray-200 bg-gray-100 text-current no-underline shadow shadow-gray-100 transition-all duration-200",
          "hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100"
        )}
        {...props}
      >
        {children}
        <span
          className={cn(
            styles.title,
            "gap-2 p-4 text-gray-700",
            "hover:text-gray-900"
          )}
        >
          {icon}
          <span className="flex gap-1">
            {title}
            {animatedArrow}
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        styles.card,
        "group flex flex-col justify-start overflow-hidden rounded-lg border border-gray-200 bg-transparent text-current no-underline shadow-sm shadow-gray-100 transition-all duration-200 dark:border-neutral-800 dark:shadow-none",
        "hover:border-gray-300 hover:bg-slate-50 hover:shadow-md hover:shadow-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-900 dark:hover:shadow-none"
      )}
      {...props}
    >
      <span
        className={cn(
          styles.title,
          "gap-2 p-4 text-gray-700 dark:text-neutral-200",
          "hover:text-gray-900 dark:hover:text-neutral-50"
        )}
      >
        {icon}
        {title}
        {animatedArrow}
      </span>
    </Link>
  );
}

export function Cards({ children, num, ...props }) {
  return (
    <div
      className={cn(styles.cards, "mt-4 gap-4")}
      {...props}
      style={
        {
          "--rows": num || 3,
          ...props.style,
        } as any
      }
    >
      {children}
    </div>
  );
}
