import {expect, test} from '@oclif/test'

describe('workspace:update', () => {
  test
    .stdout()
    .command(['workspace:update'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['workspace:update', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
