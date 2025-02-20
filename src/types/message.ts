type messageReq = {
  receiver: number
  content: string
}
type messageResp = {
  id: number
  sender: number
  sender_name:string
  receiver: number
  receiver_name:string
  content: string
  created_at: string
}
export type { messageReq, messageResp }
