import {expect, test} from '@oclif/test'

describe('workspace:list', () => {
  test
    .stdout()
    .command(['workspace:list'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['workspace:list', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
