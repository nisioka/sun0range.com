import React, { useState, useEffect } from "react"
import styled from "styled-components"

// GSM 03.38文字セット (拡張文字は含まず)
const gsm7bitChars =
  "@£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#%&'()*+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÄÖÑÜ§äöñüà"

const Container = styled.div`
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  max-width: 800px;
  padding: 20px;
`

const Title = styled.h1`
  color: var(--color-heading);
  text-align: center;
  margin-bottom: 30px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: var(--color-text-light);
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  box-sizing: border-box;
  resize: vertical;
  min-height: 150px;

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--color-accent) 25%, transparent);
  }
`

const Results = styled.div`
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;

  p {
    margin: 8px 0;
    font-size: 1.1em;
    line-height: 1.5;
  }

  strong {
    color: var(--color-accent-strong);
  }
`

const Warning = styled.p`
  color: #dc3545;
  font-weight: bold;
`

const EncodingInfo = styled.span`
  font-size: 0.9em;
  color: var(--color-text-light);
`

type SmsResult = {
  charCount: number
  encodingType: string
  encodingInfo: string
  numSegments: number
  remainingChars: number
  warning: string
}

function checkSmsLength(message: string): SmsResult {
  let isGsm7bit = true
  for (let i = 0; i < message.length; i++) {
    if (gsm7bitChars.indexOf(message[i]) === -1) {
      isGsm7bit = false
      break
    }
  }

  const charCount = message.length
  let maxSingleMsgChars: number
  let maxConcatMsgChars: number
  let encodingType: string
  let encodingInfo: string

  if (isGsm7bit) {
    encodingType = "GSM 03.38 (7-bit)"
    maxSingleMsgChars = 160
    maxConcatMsgChars = 153
    encodingInfo = "（半角英数字、一部記号、ヨーロッパ文字など）"
  } else {
    encodingType = "UCS-2 (16-bit)"
    maxSingleMsgChars = 70
    maxConcatMsgChars = 67
    encodingInfo = "（日本語、絵文字、GSM 03.38に含まれない文字など）"
  }

  let numSegments: number
  let remainingChars: number
  let warning = ""

  if (charCount === 0) {
    numSegments = 1
    remainingChars = maxSingleMsgChars
  } else if (charCount <= maxSingleMsgChars) {
    numSegments = 1
    remainingChars = maxSingleMsgChars - charCount
  } else {
    numSegments = Math.ceil(charCount / maxConcatMsgChars)
    remainingChars = numSegments * maxConcatMsgChars - charCount
    warning = `メッセージが長いため、${numSegments}通に分割されます。`
  }

  return {
    charCount,
    encodingType,
    encodingInfo,
    numSegments,
    remainingChars,
    warning,
  }
}

const SmsChecker = () => {
  const [message, setMessage] = useState("")
  const [result, setResult] = useState<SmsResult>({
    charCount: 0,
    encodingType: "GSM 03.38 (7-bit)",
    encodingInfo: "（半角英数字、一部記号、ヨーロッパ文字など）",
    numSegments: 1,
    remainingChars: 160,
    warning: "",
  })

  useEffect(() => {
    setResult(checkSmsLength(message))
  }, [message])

  return (
    <Container>
      <Title>AWS SMS 文字数チェッカー</Title>
      <Label htmlFor="messageInput">メッセージを入力してください:</Label>
      <TextArea
        id="messageInput"
        placeholder="ここにメッセージを入力..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <Results>
        <p>
          文字数: <strong>{result.charCount}</strong>
        </p>
        <p>
          エンコーディング: <strong>{result.encodingType}</strong>{" "}
          <EncodingInfo>{result.encodingInfo}</EncodingInfo>
        </p>
        <p>
          メッセージ分割数: <strong>{result.numSegments}</strong>
        </p>
        <p>
          現在のメッセージの残り文字数: <strong>{result.remainingChars}</strong>
        </p>
        {result.warning && <Warning>{result.warning}</Warning>}
      </Results>
    </Container>
  )
}

export default SmsChecker

export const Head = () => (
  <>
    <html lang="ja" />
    <title>AWS SMS 文字数チェッカー</title>
    <meta
      name="description"
      content="AWS SNSでSMSを送信する際の文字数とメッセージ分割数をチェックするツールです。"
    />
  </>
)
