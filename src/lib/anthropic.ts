import Anthropic from '@anthropic-ai/sdk'

const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

if (!apiKey) {
  throw new Error('Missing Anthropic API key')
}

export const anthropic = new Anthropic({
  apiKey,
  dangerouslyAllowBrowser: true
})
