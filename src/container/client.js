import sanityClient from "@sanity/client";
import imageUrlBuiler from '@sanity/image-url'

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_ID,
  dataset: 'production',
  apiVersion: '2023-02-09',
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN
})

const builder = imageUrlBuiler(client);

export const urlFor = (source) => builder.image(source)