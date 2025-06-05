import {
  UsersService,
  RecognitionService,
  RecognitionType,
  User,
  RecognitionResponse,
} from "@/openapi";

type SignInDependencies = {
  setUser: (user: User) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setRecognitions: (recognitions: RecognitionResponse[]) => void;
};

export const userSignIn = async ({
  setUser,
  setIsAuthenticated,
  setRecognitions,
}: SignInDependencies) => {
  const randomUserId = Math.floor(Math.random() * 10) + 1;

  const user = await UsersService.getUserByIdUsersUserIdGet(randomUserId);

  setUser(user);
  setIsAuthenticated(true);

  const recognitions =
    await RecognitionService.getUserRecognitionsRecognitionUserUserIdGet(
      user.id,
      RecognitionType.ALL,
      5,
    );

  setRecognitions(recognitions);
};
