import { Algorithm } from "@/types/algorithms";
import { Content, WalletLedgerQuiz } from "./Content";

export const walletLedgerDesign: Algorithm = {
  id: "wallet-ledger",
  title: "Wallet/Ledger Service",
  category: "designs",
  singlePage: true,
  problem: <Content />,
  algorithm: <WalletLedgerQuiz />,
  solution: null,
  improvements: null,
};
