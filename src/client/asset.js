// src/client/asset.js
// 需要加载的资源
const ASSET_NAMES = [
  'ball.svg',
  'aim.svg'
]

// 将下载好的图片文件保存起来供canvas使用
const assets = {};
// 每一张图片都是通过promise进行加载的，所有图片加载成功后，Promise.all就会结束
const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset))

function downloadAsset(assetName) {
  return new Promise(resolve => {
    const asset = new Image();
    asset.onload = () => {
      console.log(`Downloaded ${assetName}`)
      assets[assetName] = asset;
      resolve();
    }
    asset.src = `/assets/${assetName}`
  })
}

export const downloadAssets = () => downloadPromise;
export const getAsset = assetName => assets[assetName]