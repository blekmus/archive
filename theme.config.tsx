import { DocsThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  logo: (
    <span>
      <b>Archive</b>
    </span>
  ),
  head: (
    <script
      lang="javascript"
      dangerouslySetInnerHTML={{
        __html: `if (!window.localStorage.getItem("theme_default")) {
      window.localStorage.setItem("theme", "dark");
      window.localStorage.setItem("theme_default", "dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }`,
      }}
    />
  ),
  project: {
    link: "https://github.com/blekmus/archive",
  },
  docsRepositoryBase: "https://github.com/blekmus/archive",
  useNextSeoProps() {
    const { route } = useRouter();
    if (route !== "/") {
      return {
        titleTemplate: "%s – Archive",
      };
    }
  },
  feedback: {
    content: null,
  },
  editLink: {
    text: null,
  },
  sidebar: {
    titleComponent: ({ title, type }) => {
      if (type === "separator") {
        return <span className="cursor-default">{title}</span>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 0,
  },
  footer: {
    text: () => {
      return <p className="text-sm">© 2022 The Nextra Project.</p>;
    },
  },
  darkMode: false,
};

export default config;
