import type { NextApiRequest, NextApiResponse } from 'next'
import { ImageResponse } from '@vercel/og'
// import { SwapOgImage } from 'components/swap'
import { NFTOgImage } from 'components/nft'
import { SwapOgImage } from 'components/swap'
import { NFTCollectionOgImage } from 'components/nft-collection'
import { VotingOgImage } from 'components/voting'
import { z } from 'zod'
import { FONT_BOLD, zTemplate } from '../../../config'

export const config = {
  runtime: 'edge',
}

const kanit600_ = fetch(new URL(FONT_BOLD, import.meta.url)).then((res) => res.arrayBuffer())

const zString = z.string().min(1)

// async function checkImages(images: string[]) {
//   if (images.length < 2) return false
//   const promises = images.map((image) => fetch(image).then((res) => res.status))
//   const statuses = await Promise.all(promises)
//   return statuses.every((status) => status === 200)
// }

// eslint-disable-next-line consistent-return
export default async function handler(req: NextApiRequest, res: NextApiResponse<ImageResponse>) {
  const kanit600 = await kanit600_

  const url = zString.parse(req?.url)
  const { searchParams } = new URL(url)
  const template_ = searchParams.get('template')
  const template = zTemplate.parse(template_)

  let comp

  if (template === 'voting') {
    const title_ = searchParams.get('title')
    const title = zString.parse(title_)
    comp = <VotingOgImage title={title} />
  }

  if (template === 'nft') {
    const title_ = searchParams.get('title')
    const image_ = searchParams.get('image')
    const price = searchParams.get('price')
    const nativePrice = searchParams.get('nativePrice')

    const title = zString.parse(title_)
    const image = zString.parse(image_)

    comp = <NFTOgImage title={title} price={price} image={image} nativePrice={nativePrice} />
  }

  if (template === 'swap') {
    const inputSymbol = searchParams.get('inputSymbol')
    const outputSymbol = searchParams.get('outputSymbol')
    const inputImage = searchParams.get('inputImage')
    const outputImage = searchParams.get('outputImage')

    // const [inputSymbol, outputSymbol, inputImage, outputImage] = [input_, output_, inputImage_, outputImage_].map(
    //   (param) => zString.parse(param),
    // )

    comp = (
      <SwapOgImage
        // @ts-ignore
        inputImage={inputImage}
        // @ts-ignore
        outputImage={outputImage}
        // @ts-ignore
        inputSymbol={inputSymbol}
        // @ts-ignore
        outputSymbol={outputSymbol}
      />
    )
  }

  if (template === 'nft-collection') {
    const title_ = searchParams.get('title')
    const volume = searchParams.get('volume')
    const collectionId_ = searchParams.get('collectionId')

    const [title, collectionId] = [title_, collectionId_].map((param) => zString.parse(param))

    comp = <NFTCollectionOgImage title={title} volume={volume} collectionId={collectionId} />
  }

  if (comp) {
    return new ImageResponse(comp, {
      width: 800,
      fonts: [
        {
          data: kanit600,
          name: 'Kanit',
          weight: 600,
        },
      ],
      height: 450,
    })
  }

  res.redirect(301, 'https://assets.pancakeswap.finance/web/og/hero.jpg')
}
