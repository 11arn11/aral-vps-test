import {expect, test} from '@oclif/test'

describe('destroyAll', () => {
  test
    .stdout()
    .command(['destroyAll'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['destroyAll', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
