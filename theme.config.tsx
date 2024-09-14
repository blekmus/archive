import { DocsThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  logo: <b>Archive</b>,
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Archive" />
      <meta
        property="og:description"
        content="A techy knowledge base for the easily forgetful"
      />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <script
        defer
        src="https://analytics.dinil.dev/harmless_metrics_mkay"
        data-website-id="175f912f-7e77-4355-87a0-f4732595bc50"
      ></script>
    </>
  ),
  feedback: {
    content: null,
  },
  editLink: {
    text: null,
  },
  project: {
    link: "https://github.com/blekmus/archive/issues",
  },
  docsRepositoryBase: "https://github.com/blekmus/archive",
  useNextSeoProps() {
    const { route } = useRouter();
    if (route !== "/") {
      return {
        titleTemplate: "%s - Archive",
      };
    }
  },
  sidebar: {
    titleComponent: ({ title, type }) => {
      if (type === "separator") {
        return <span className="cursor-default">{title}</span>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
    autoCollapse: true,
  },
  footer: {
    text: null,
    component: null,
  },
};

export default config;
