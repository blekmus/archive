import { Callout } from "nextra-theme-docs"

export function Warning({ children }) {
  return <Callout type="warning" emoji="">{children}</Callout>;
}
