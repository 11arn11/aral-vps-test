import {expect, test} from '@oclif/test'

describe('workspace/start', () => {
  test
    .stdout()
    .command(['workspace/start'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['workspace/start', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
