import { DetailedFeatureLink } from "./feature";


// import { InfoCard } from "@components/infocard";
// <InfoCard />;


export const InfoCard = () => {
  return (
    <div className="grid grid-cols-1 mt-12 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:gap-x-8 lg:gap-y-12">
      <DetailedFeatureLink
        feature={{
          description: `Minimal Turborepo example for learning the
              fundamentals.`,
          name: "Basic",
        }}
        href="https://github.com/vercel/turbo/tree/main/examples/basic"
      ></DetailedFeatureLink>
      <DetailedFeatureLink
        feature={{
          description:
            "Unify your site's look and feel by sharing a design system across multiple apps.",
          name: "Design System",
        }}
        href="https://github.com/vercel/turbo/tree/main/examples/design-system"
      ></DetailedFeatureLink>
    </div>
  );
};
