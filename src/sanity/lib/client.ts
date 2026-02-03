import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, assertValue } from '../env'

export const client = createClient({
    projectId: assertValue(projectId, 'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'),
    dataset: assertValue(dataset, 'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'),
    apiVersion,
    useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
