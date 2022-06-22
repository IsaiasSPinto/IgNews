import { query as q} from "faunadb"
import NextAuth from "next-auth"
import Email from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"
import { fauna } from "../../../services/faunadb"
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
      
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn( user ) {
      const email = user.user.email    
      try{
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('users_by_email'),
                  q.Casefold(email)                
                )
              )
            ),
            q.Create(
              q.Collection('Users'),
              {data: {email} }
            ),
            q.Get(
              q.Match(
                q.Index('users_by_email'),
                q.Casefold(email)                
              )
            )
          )
        )

        return true
      }catch{
        return false
      }
    },
  }
})