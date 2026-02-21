export { default } from 'virtual:netlify-server-entry';

declare module 'virtual:netlify-server-entry' {
  import type { ServerEntryModule } from 'react-router'
  const entry: ServerEntryModule
  export default entry
}