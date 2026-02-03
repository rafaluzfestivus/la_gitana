import { type SchemaTypeDefinition } from 'sanity'

import { modularCard } from './schemaTypes/modularCard'
import { modularSession } from './schemaTypes/modularSession'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [modularSession, modularCard],
}
