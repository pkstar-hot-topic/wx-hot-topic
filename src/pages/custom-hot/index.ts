import './index.json'
import './index.wxml'
import './index.scss'

import { createPage } from '@codelet/core'

createPage({
	data: {
		dataArr: [{ title: '', type: '' }],
		options: [{ label: 'a', value: 1 }],
	},
	handleAdd() {
		this.setData({
			dataArr: [...this.data.dataArr, { title: '', type: '' }],
		})
	},
})
