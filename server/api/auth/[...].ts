import { Issuer, generators } from "openid-client";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  try {
    const iss = await Issuer.discover(config.openiddict.issuer);
    console.log("Discovered issuer %s %O", iss.issuer, iss.metadata);
    const client = new iss.Client({
      client_id: config.openiddict.clientId,
      client_secret: config.openiddict.clientSecret,
      redirect_uris: [
        `${config.public.baseUrl}/${config.openiddict.redirectUrl}`,
      ],
      post_logout_redirect_uris: [
        `${config.public.baseUrl}/${config.openiddict.postLogoutRedirectUrl}`,
      ],
      response_types: ["code"],
    });
    if (event.path == "/api/auth/signin") {
      try {
        const codeVerifier = generators.codeVerifier();
        const codeChallenge = generators.codeChallenge(codeVerifier);
        const codeChallengeMethod = "S256";

        setCookie(event, "code_verifier", codeVerifier, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });

        const authorizationUrl = client.authorizationUrl({
          scope: config.openiddict.scope,
          client_id: config.openiddict.clientId,
          resource: config.public.baseUrl,
          code_challenge: codeChallenge,
          code_challenge_method: codeChallengeMethod,
        });
        await sendRedirect(event, authorizationUrl);
      } catch (e: unknown) {
        if (e instanceof Error) {
          return {
            error: "Error discovering issuer.",
            isAuthenticated: "false",
            message: e.message,
          };
        }
      }
    } else if (event.path.includes(config.openiddict.redirectUrl)) {
      try {
        const code_verifier = getCookie(event, "code_verifier");

        const req = event.node.req;
        const params = client.callbackParams(req);
        const tokenSet = await client.callback(
          `${config.public.baseUrl}/${config.openiddict.redirectUrl}`,
          {
            code: params.code,
            iss: `${config.openiddict.issuer}/`,
          },
          {
            code_verifier,
          },
        );
        const claims = tokenSet.claims();
        const sessions = await useSession(
          event,
          { password: config.sessionSecret }
        );
        await sessions.update({
          tokenSet: tokenSet,
          user: claims,
        });
        setCookie(event, "auth_session", JSON.stringify({tokenSet: tokenSet, user: claims}), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        if(claims.tenantid) {
          setCookie(event, "__tenant", JSON.stringify(claims.tenantid), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });
        }
        await sendRedirect(event, "/admin");
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error("Error Authenticating: ", e.message);
          await sendRedirect(event, "/", 400);
        }
      }
    } else if (event.path == "/api/auth/signup") {
      await sendRedirect(event, `${config.openiddict.issuer}/Account/Register`);
    } else if (event.path == "/api/auth/signout") {
      const logoutUrl = client.endSessionUrl({
        client_id: config.openiddict.clientId,
        post_logout_redirect_uri: config.openiddict.postLogoutRedirectUrl,
      });
      console.log("Logging out: ", logoutUrl);
      deleteCookie(event, "auth_session");
      await sendRedirect(event, "/");

    } else if (event.path == `/${config.openiddict.postLogoutRedirectUrl}`) {
      // Todo: check and remove this
      deleteCookie(event, "auth_session");
      await sendRedirect(event, "/");
    } else {
      await sendRedirect(event, "/error/notfound", 404);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log("Error discovering issuer: ", e.message);
      return {
        error: "Error discovering issuer.",
        isAuthenticated: "false",
        message: e.message,
      };
    }
  }
});
