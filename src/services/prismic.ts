import * as prismic from '@prismicio/client'
import sm from '../../sm.json'

const endpoint = sm.apiEndpoint
const repositoryName = prismic.getRepositoryName(endpoint)

// This factory function allows smooth preview setup
export function getPrismicClient(req?) {
  const client = prismic.createClient(
    repositoryName,
    {
      accessToken : process.env.PRISMIC_ACCESS_TOKEN
    }
  )

  return client
}