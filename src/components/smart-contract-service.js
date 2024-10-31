"use client";

// services to call stacks smart contract
// imports
import { openContractCall, showConnect } from "@stacks/connect";
import { StacksNetwork, STACKS_TESTNET } from "@stacks/network";
import {
    AnchorMode,
    fetchCallReadOnlyFunction,
    PostConditionMode,
    principalCV,
    stringAsciiCV,
    stringUtf8CV,
    uintCV,
} from "@stacks/transactions";
import { openSTXTransfer } from "@stacks/connect";
// import { userSession } from "../components/shared/ConnectWallet";
//imports - end

const STACKS_ADDRESS = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
const CONTRACT_NAME = "hello-world";

// my contract and address data
//const network = new StacksNetwork();
const contractAddress = STACKS_ADDRESS as string;
const contractName = CONTRACT_NAME as string;

export type ContractAddEvent = {
    //ownerPrincipal: string;
    //eventUUID: string;
    //priceInStx: string;
    rating: number;
    comment: string;
    endDateTime: Date;

};
export function contractAddEvent(
    { rating, comment, endDateTime }: ContractAddEvent,
): Promise<any> {
    return new Promise((resolve, reject) => {
        console.log({ rating, comment, endDateTime });
        const commentAscii = stringAsciiCV(comment);
        const rating_val = uintCV(rating);
        const expiry = uintCV((endDateTime as Date).getTime() / 1000 | 0);

        console.log([commentAscii, rating_val, expiry]);

        console.log(contractAddress, contractName);
        openContractCall({
            network: STACKS_TESTNET,
            anchorMode: AnchorMode.Any,

            contractAddress,
            contractName,
            functionName: "add-event",
            functionArgs: [rating_val, commentAscii, expiry],

            postConditionMode: PostConditionMode.Deny,
            postConditions: [],

            onFinish: (result) => {
                console.log(result);
                resolve(result); // Resuelve la promesa con el resultado
            },
            onCancel: () => {
                console.log("onCancel:", "Transaction was canceled");
                reject(new Error("Transaction was canceled")); // Rechaza la promesa con un error
            },
        });
    });
}

export function contractUpdateEvent(
    { rating, comment, endDateTime }: ContractAddEvent,
): Promise<any> {
    return new Promise((resolve, reject) => {
        const commentAscii = stringAsciiCV(comment);
        const rating_val = uintCV(rating);
        const expiry = uintCV((endDateTime as Date).getTime() / 1000 | 0);

        openContractCall({
            contractAddress,
            contractName,
            functionName: "update-event",
            functionArgs: [commentAscii, rating_val, expiry],
            onFinish: (result) => {
                console.log(result);
                resolve(result); // Resuelve la promesa con el resultado
            },
            onCancel: () => {
                console.log("onCancel:", "Transaction was canceled");
                reject(new Error("Transaction was canceled")); // Rechaza la promesa con un error
            },
        });
    });
}

function getEvent(eventUUID: string) {
    const eventId = stringAsciiCV(eventUUID);

    const options = {
        contractAddress,
        contractName,
        functionName: "get-event",
        functionArgs: [eventId],
        senderAddress: contractAddress,
        network: STACKS_TESTNET,
    };

    fetchCallReadOnlyFunction(options)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            console.error("Failed to fetch event details:", error);
        });
}

export type ContractBuyTicket = {
    ownerPrincipal: string;
    eventUUID: string;
    ticketId: string;
    price: string;
};

/*function buyTicket({ ownerPrincipal, eventUUID, ticketId, price }: ContractBuyTicket) {

    const priceInNumber: number = Number(`${price}000`);



    if (priceInNumber) {
        openSTXTransfer({
            network: new StacksTestnet(),

            recipient: ownerPrincipal, // which address we are sending to
            amount: priceInNumber.toString(), // tokens, denominated in micro-STX
            anchorMode: AnchorMode.OnChainOnly,

            onFinish: (response) => {
                return response;
            },
            onCancel: () => console.log('User canceled'),
        });
    }

    openContractCall({
        network,
        contractAddress,
        contractName,
        functionName: "buy-ticket",
        functionArgs: [eventUUID, ticketId],
        onFinish: (data) => {
            console.log("onFinish:", data);
        },
        onCancel: () => {
            console.log("onCancel:", "Transaction was canceled");
        },
    });
} */

export function buyTicket(
    { ownerPrincipal, eventUUID, ticketId, price }: ContractBuyTicket,
): Promise<any> {
    return new Promise((resolve, reject) => {
        const priceInNumber: number = Number(`${price}000000`);

        let payTxId: string = ''

        const eventId = stringAsciiCV(eventUUID)
        const ticketIdToAscii = stringAsciiCV(ticketId)

        if (priceInNumber) {
            openSTXTransfer({
                network: STACKS_TESTNET,
                recipient: ownerPrincipal,
                amount: `${priceInNumber}`,
                anchorMode: AnchorMode.Any,
                onFinish: (response) => {
                    payTxId = response.txId as string;
                    console.log("Transferencia completada:", response);
                },
                onCancel: () => {
                    console.log("La transferencia fue cancelada por el usuario");
                    reject(new Error("La transferencia fue cancelada por el usuario")); // Rechaza la promesa si la transferencia es cancelada
                },
            });
        }


        openContractCall({
            network: STACKS_TESTNET,
            contractAddress,
            contractName,
            functionName: "buy-ticket",
            functionArgs: [eventId, ticketIdToAscii],
            onFinish: (data) => {
                console.log("Transacción completada:", data);
                resolve({ ...data, payTxId }); // Resuelve la promesa con el resultado de la transacción
            },
            onCancel: () => {
                console.log("Transacción cancelada:", "Transaction was canceled");
                reject(new Error("Transacción cancelada")); // Rechaza la promesa si la transacción es cancelada
            },
        });
    });
}