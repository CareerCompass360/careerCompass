import { StackClientApp } from "@stackframe/stack";

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signIn: "/handler/sign-in",
    afterSignIn: "/",
    signUp: "/handler/sign-up",
    afterSignUp: "/",
  },
});
