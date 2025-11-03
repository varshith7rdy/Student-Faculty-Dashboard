// Octokit.js
// https://github.com/octokit/core.js#readme
import { Octokit, App } from "octokit"

const octokit = new Octokit({
  auth: 'Personal Access Token'
})

await octokit.request('POST /repos/varshith7rdy/Student-Faculty-Dashboard/pulls', {
  owner: 'varshith7rdy',
  repo: 'Student-Faculty-Dashboard',
  title: 'Amazing new feature',
  body: 'Please pull these awesome changes in!',
  head: 'api-testing',
  base: 'main',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})