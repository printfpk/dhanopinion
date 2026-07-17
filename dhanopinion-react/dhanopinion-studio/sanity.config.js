import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {myStructure} from './deskStructure'
import {table} from '@sanity/table'

export default defineConfig({
  name: 'default',
  title: 'dhanopinion-studio',

  projectId: 'gg3p2wwe',
  dataset: 'production',

  plugins: [structureTool({ structure: myStructure }), visionTool(), table()],

  schema: {
    types: schemaTypes,
  },
})
