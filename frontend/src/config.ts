import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

export const SuperTokensConfig = {
  appInfo: {
    appName: "SuperTokens Demo App111",
    apiDomain: "http://127.0.0.1:80",
    websiteDomain: "http://127.0.0.1:80",
  },
  recipeList: [
    EmailPassword.init({
      useShadowDom: false,
    }),
    Session.init(),
  ],
};
