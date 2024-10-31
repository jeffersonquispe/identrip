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
const contractAddress = STACKS_ADDRESS;
const contractName = CONTRACT_NAME;

/**
 * @typedef {Object} ContractAddEvent
 * @property {number} rating
 * @property {string} comment
 * @property {Date} endDateTime
 */
export function contractAddEvent(
    { rating, comment, endDateTime }) {
    return new Promise((resolve, reject) => {
        console.log({ rating, comment, endDateTime });
        const commentAscii = stringAsciiCV(comment);
        const rating_val = uintCV(rating);
        const expiry = uintCV(Math.floor(endDateTime.getTime() / 1000));

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

export function contractUpdateEvent({ rating, comment, endDateTime }) {
    return new Promise((resolve, reject) => {
        const commentAscii = stringAsciiCV(comment);
        const rating_val = uintCV(rating);
        const expiry = uintCV(Math.floor(endDateTime.getTime() / 1000));

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

function getEvent(eventUUID) {
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

/**
 * @typedef {Object} ContractBuyTicket
 * @property {string} ownerPrincipal
 * @property {string} eventUUID
 * @property {string} ticketId
 * @property {string} price
 */

export function buyTicket({ ownerPrincipal, eventUUID, ticketId, price }) {
    return new Promise((resolve, reject) => {
        const priceInNumber = Number(`${price}000000`);
        let payTxId = '';
        
        const eventId = stringAsciiCV(eventUUID)
        const ticketIdToAscii = stringAsciiCV(ticketId)

        if (priceInNumber) {
            openSTXTransfer({
                network: STACKS_TESTNET,
                recipient: ownerPrincipal,
                amount: `${priceInNumber}`,
                anchorMode: AnchorMode.Any,
                onFinish: (response) => {
                    payTxId = response.txId;
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