import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/mongodb";

// const adminEmails = ["abdulraheemar611@gmail.com", "k213951@nu.edu.pk"];

export const authOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_FRONT_ID,
      clientSecret: process.env.GOOGLE_FRONT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

// export async function isAdminRequest(req, res) {
//   const session = await getServerSession(req, res, authOptions);

//   if (!adminEmails.includes(session?.user.email)) throw "not admin";
// }

export default NextAuth(authOptions);
