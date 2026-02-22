import HomePage from "./HomePage"
import data from "../data.json"
import type { data as DataType } from "@/types/main"

export default function page() {
  return <HomePage data={data as unknown as DataType} />
}
