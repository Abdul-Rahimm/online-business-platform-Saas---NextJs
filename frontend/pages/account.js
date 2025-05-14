import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AccountPage() {
  const { data: session } = useSession();
  console.log("session data", session);

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  async function login() {
    await signIn("google", {
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  return (
    <>
      <Header />
      <Center>
        <Title>Account</Title>
        {session && (
          <Button primary={1} onClick={() => logout()}>
            Logout
          </Button>
        )}

        {!session && (
          <Button primary={1} onClick={login}>
            Log in
          </Button>
        )}
      </Center>
    </>
  );
}
