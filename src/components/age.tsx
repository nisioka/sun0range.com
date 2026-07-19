import * as React from "react"

const Age = ({ birthday }: { birthday: string }) => {
  const birth = new Date(birthday)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const beforeAnniversary =
    now.getMonth() < birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())
  if (beforeAnniversary) age--
  return <>{age}</>
}
export default Age
