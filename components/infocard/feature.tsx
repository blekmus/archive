import Link from "next/link";


type Feature = {
  name: string;
  description: React.ReactNode;
  Icon?: React.ReactNode;
};

type FeatureProps = {
  feature: Feature;
  detailed?: boolean;
};

const DetailedFeatureInner = (props: { feature: FeatureProps["feature"] }) => {
  const { Icon, name, description } = props.feature;
  return (
    <>
      <div className="inline-flex items-center space-x-3">
        <div className="flex items-center justify-center bg-black rounded-full bg-opacity-5 w-9 h-9 icon-circle">
          {Icon}
        </div>
        <h3 className="m-0 text-lg font-semibold leading-6 tracking-tight text-gray-900 dark:text-white">
          {name}
        </h3>
      </div>
      <div>
        <p className="mt-2 text-base font-medium leading-7 text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <style jsx global>{`
        html.dark .icon-circle {
          background: linear-gradient(
            180deg,
            rgba(50, 134, 241, 0.2) 0%,
            rgba(195, 58, 195, 0.2) 100%
          );
        }
      `}</style>
    </>
  );
};

const featureWrapperClasses = `relative block overflow-hidden p-10 bg-white shadow-lg rounded-xl dark:bg-opacity-5 no-underline text-black dark:text-white`;

export const DetailedFeatureLink = (props: {
  href: string;
  feature: FeatureProps["feature"];
}) => {
  return (
    <Link href={props.href} className={featureWrapperClasses}>
      <DetailedFeatureInner feature={props.feature}></DetailedFeatureInner>
    </Link>
  );
};

export default function Feature(props: FeatureProps) {
  const { feature, detailed = false } = props;
  const { Icon, name } = feature;

  if (detailed) {
    return (
      <div className={featureWrapperClasses}>
        <DetailedFeatureInner feature={feature} />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div>
        {Icon}
      </div>
      <div>
        <div className="my-0 font-medium dark:text-white">{name}</div>
      </div>
    </div>
  );
}
