import { AccessToken, Role } from "@huddle01/server-sdk/auth";

export const createAccessToken = async (roomID) => {
  const accessToken = new AccessToken({
    apiKey: "qX58fmJMe7G498Xb3tQ2Ifxt-wjiYouK",
    roomId: roomID,
    role: Role.HOST,
    permissions: {
      admin: true,
      canConsume: true,
      canProduce: true,
      canProduceSources: {
        cam: true,
        mic: true,
        screen: true,
      },
      canRecvData: true,
      canSendData: true,
      canUpdateMetadata: true,
    },
    options: {
      metadata: {
        // you can add any custom attributes here which you want to associate with the user
        walletAddress: "axit.eth",
      },
    },
  });

  const token = await accessToken.toJwt();
  console.log("accessToken", token);
  return token;
};
