import { Callout } from "nextra-theme-docs";

export function Warning({ children }) {
  return (
    <Callout type="warning" emoji="">
      {children}
    </Callout>
  );
}

export function Error({ children }) {
  return (
    <Callout type="error" emoji="">
      {children}
    </Callout>
  );
}

export function Info({ children }) {
  return (
    <Callout type="info" emoji="">
      {children}
    </Callout>
  );
}
