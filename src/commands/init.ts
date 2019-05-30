import {Command} from '@oclif/command'
import {cli} from 'cli-ux'
import * as execa from 'execa'
import * as fse from 'fs-extra'

export default class Init extends Command {
  static description = 'describe the command here'
  async run() {
    const system_config_path = await cli.prompt('Dove vuoi conservare la configurazione?', {
      required: true,
      default: this.config.configDir
    })
    const system_volumes_path = await cli.prompt('Dove vuoi conservare i dati dei volumi montati?', {
      required: true,
      default: this.config.dataDir
    })
    const system_domain = await cli.prompt('Quale dominio vuoi utilizzare?', {
      required: true,
      default: 'localhost'
    })
    if (!fse.existsSync(this.config.configDir)) {
      await execa('mkdir', ['-p', this.config.configDir])
    }

    await fse.writeJson(this.user_config_path(), {
      system_config_path,
      system_volumes_path,
      system_domain
    })




  }
}
