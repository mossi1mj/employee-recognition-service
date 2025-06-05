import { addToast } from "@heroui/react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
} from "firebase/auth";

import { auth } from "./firebase";

export enum AuthProviderName {
  GOOGLE = "google",
  FACEBOOK = "facebook",
  GITHUB = "github",
  APPLE = "apple",
}

export const signInWithProvider = async (providerName: AuthProviderName) => {
  let provider;

  switch (providerName) {
    case "google":
      provider = new GoogleAuthProvider();
      break;
    case "facebook":
      provider = new FacebookAuthProvider();
      break;
    case "github":
      provider = new GithubAuthProvider();
      break;
    case "apple":
      provider = new OAuthProvider("apple.com");
      break;
    default:
      throw new Error("Unsupported provider");
  }

  try {
    const result = await signInWithPopup(auth, provider);

    return addToast({
      title: `Hi, ${result.user.displayName}`,
      description: `You have successfully signed in with ${providerName}`,
    });
  } catch (error: any) {
    addToast({
      title: "Sign In Failed",
      description: (error as Error).message,
    });
    throw new Error(`Sign in with ${providerName} failed: ${error.message}`);
  }
};
