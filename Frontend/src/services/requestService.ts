import API from "./api";


import type {
  IncomingRequest,
  OutgoingRequest,
  SendRequestBody
} from "../types/request";

export const sendConnectionRequest = async (
  body: SendRequestBody
): Promise<{ message: string }> => {
 
  const res = await API.post<{ message: string }>(
    "/requests",
    body
  );

  

  return res.data;
};



export const getIncomingRequests = async (): Promise<
  IncomingRequest[]
> => {
  const res = await API.get<IncomingRequest[]>(
    "/requests/incoming"
  );

  return res.data;
};

export const getOutgoingRequests = async (): Promise<
  OutgoingRequest[]
> => {
  const res = await API.get<OutgoingRequest[]>(
    "/requests/outgoing"
  );

  return res.data;
};