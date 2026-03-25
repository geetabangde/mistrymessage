import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string;
  }

  interface Session {
    user: {
      _id?: string;
      email?: string;
      username?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
  }
}