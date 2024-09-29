import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "../../../lib/mongodb";

const adminEmails = ["abdulraheemar611@gmail.com", "k213951@nu.edu.pk"];

export const authOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      console.log("session ", { session, token, user });

      if (adminEmails.includes(session?.user?.email)) return session;
      else return false;
    },
  },
};

export async function isAdminRequest(req, res) {
  const session = getServerSession(req, res, authOptions);

  if (!adminEmails.includes(session?.user.email)) throw "not admin";
}

export default NextAuth(authOptions);
