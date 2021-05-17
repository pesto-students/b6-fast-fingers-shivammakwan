import { useLocation } from "react-router-dom";

export function useQuery() {
  let query = new URLSearchParams(useLocation().search);
  let data = {};
  for (let params of query.entries()) {
    data[params[0]] = params[1];
  }
  return { ...data };
}
