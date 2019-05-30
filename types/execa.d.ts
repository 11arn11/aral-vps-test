export = index;
declare function index(cmd: any, args: any, opts: any): any;
declare namespace index {
  function shell(cmd: any, opts: any): void;
  function shellSync(cmd: any, opts: any): void;
  function stderr(args: any): void;
  function stdout(args: any): void;
  function sync(cmd: any, args: any, opts: any): any;
}
