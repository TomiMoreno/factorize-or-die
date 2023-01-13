import type { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_FACT } from "../../../utils/constants";
const NUMBERS_API_URL = "http://numbersapi.com";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ fact: string }>
) {
  const { n } = req.query;
  const fact = await fetch(`${NUMBERS_API_URL}/${n}`)
    .then((res) => res.text())
    .catch(() => DEFAULT_FACT);

  res.status(200).json({
    fact,
  });
}
