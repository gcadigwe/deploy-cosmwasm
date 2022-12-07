import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import {
  defaultRegistryTypes as defaultStargateTypes,
  SigningStargateClient,
  StargateClient,
  assertIsDeliverTxSuccess,
} from "@cosmjs/stargate";
import { GasPrice } from "@cosmjs/stargate";

import { SigningCosmWasmClient, JsonObject } from "@cosmjs/cosmwasm-stargate";
import fs from "fs";
import { dirname } from "path";

async function main() {
  const mnemonic = "";
  // const rpc = "https://rpc.uni.juno.deuslabs.fi";
  const rpc = "https://juno-testnet-rpc.polkachu.com/";

  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: "juno",
  });
  const [firstAccount] = await wallet.getAccounts();
  console.log(firstAccount);

  const numner = 10;

  //   const rpc = "https://rpc.juno.omniflix.co/";
  const client = await SigningCosmWasmClient.connectWithSigner(rpc, wallet, {
    gasPrice: GasPrice.fromString("1ujunox"),
  });

  // client.getHeight()
  //   client

  const balance = await client.getBalance(firstAccount.address, "ujunox");

  const wasmFile = fs.readFileSync(__dirname + "/dailyrocket_ibc.wasm");

  //1312

  console.log(balance);

  // const { contractAddress } = await client.instantiate(
  //   firstAccount.address,
  //   1312,
  //   { default_timeout: 60 },
  //   "daily",
  //   "auto"
  // );

  // console.log(contractAddress);

  // const contract = await client.getContract(
  //   "juno1898aw7k3acemdqj6ejcuvqae0uxa252a7zqq07tg7e55qdpy4gcshmc7dp"
  // );
  // const response = await client.queryContractSmart(
  //   "juno1898aw7k3acemdqj6ejcuvqae0uxa252a7zqq07tg7e55qdpy4gcshmc7dp",
  //   { port: {} }
  // );

  // console.log(contract.ibcPortId);

  // const up = await client.upload(firstAccount.address, wasmFile, "auto");

  // const { codeId, transactionHash } = up;

  // console.log(codeId);
  // console.log(transactionHash);

  // console.log(wasmFile);
  console.log(await client.getChainId());
  //   console.log(client);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
