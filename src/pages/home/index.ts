import './index.json'
import './index.wxml'
import './index.scss'

import { createPage, TransferBehavior } from '@codelet/core'
import { sleep } from '@pkstar/utils'

import { withError, withLoading } from '@/utils'

async function reqDataList(x: number) {
	console.log('x => ', x)
	await sleep(1000)
	// if (x) {
	// 	throw x
	// }
	return [1, 2, 3]
}

const reqDataListLoading = withLoading(reqDataList)

console.log('reqDataList', reqDataList.length)
console.log('reqDataListLoading', reqDataListLoading.length)

const reqDataListLoadingError = withError(reqDataListLoading)

createPage({
	behaviors: [TransferBehavior],
	data: {
		platforms: [
			{
				name: '微博热搜',
				value: 'weibo',
				img: '/assets/images/b-weibo.jpg',
				url: '/pages/custom-hot/index',
			},
			{
				name: '百度热搜',
				value: 'douyin',
				img: '/assets/images/b-baidu.png',
				url: '/pages/custom-hot/index',
			},
			{
				name: '抖音热点',
				value: 'douyin',
				img: '/assets/images/b-douyin.png',
				url: '/pages/custom-hot/index',
			},
		],
	},
	async fetchData() {
		// const data = await reqDataListLoadingError(1, 'true', this)
		const data = await reqDataListLoading(1)
		this.setData({ data })
	},
})
