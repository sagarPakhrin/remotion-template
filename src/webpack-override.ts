import { enableTailwind } from "@remotion/tailwind";
import { WebpackOverrideFn } from "@remotion/bundler";

const chConfig = {
  syntaxHighlighting: {
    theme: "github-dark",
  },
};

export const enableMdx: WebpackOverrideFn = async (currentConfiguration) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { remarkCodeHike, recmaCodeHike } = await import("codehike/mdx");

  return {
    ...currentConfiguration,
    module: {
      ...currentConfiguration.module,
      rules: [
        ...(currentConfiguration.module?.rules
          ? currentConfiguration.module.rules
          : []),
        {
          test: /\.mdx?$/,
          use: [
            {
              loader: "@mdx-js/loader",
              options: {
                remarkPlugins: [[remarkCodeHike, chConfig]],
                recmaPlugins: [[recmaCodeHike, chConfig]],
              },
            },
          ],
        },
      ],
    },
  };
};

export const webpackOverride: WebpackOverrideFn = (currentConfiguration) => {
  return enableMdx(enableTailwind(currentConfiguration));
};
