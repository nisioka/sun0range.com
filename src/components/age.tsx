import * as React from "react"

import config from "../../gatsby-config"

const Age = ({ birthday }: { birthday: string }) => {
  return (
    <>
      {
        Math.floor(
          (new Date().valueOf() - new Date(birthday).valueOf()) / 31536000000
        ) as number
      }
    </>
  )
}
export default Age
