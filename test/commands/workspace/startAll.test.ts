import {expect, test} from '@oclif/test'

describe('workspace:startAll', () => {
  test
    .stdout()
    .command(['workspace:startAll'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['workspace:startAll', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
