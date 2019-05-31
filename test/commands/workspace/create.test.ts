import {expect, test} from '@oclif/test'

describe('workspace:create', () => {
  test
    .stdout()
    .command(['workspace:create'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['workspace:create', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
