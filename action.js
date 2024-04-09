const Jira = require('./common/net/Jira')
module.exports = class {
  constructor ({ githubEvent, argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    })

    this.config = config
    this.argv = argv
    this.githubEvent = githubEvent
  }

  async execute () {
    const issues = this.argv.issue || this.config.issue || null
    const { comment } = this.argv

    const issues_list = issues.split(",");
    for (const issueId of issues_list) {
      console.log(`Adding comment to ${issueId}: \n${comment}`);
      await this.Jira.addComment(issueId, { body: comment });
    }

    return {}
  }
}
