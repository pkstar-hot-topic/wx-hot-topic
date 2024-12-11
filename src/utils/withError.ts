import { createWithError } from '@codelet/core'
import { formatMessage } from '@pkstar/utils'

import { excludeMessage } from './excludeMessage'

export const withError = createWithError({
  excludeMessage,
  formatMessage: (err: any) => formatMessage(err?.reason ?? err),
})
