import { useEffect, useState } from "react";

import {
  getIncomingRequests,
  getOutgoingRequests,
} from "../services/requestService";

import type {
  IncomingRequest,
  OutgoingRequest,
} from "../types/request";

const Requests = (): React.JSX.Element => {
  const [incoming, setIncoming] = useState<IncomingRequest[]>([]);
  const [outgoing, setOutgoing] = useState<OutgoingRequest[]>([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async (): Promise<void> => {
    try {
      const incomingData = await getIncomingRequests();
      const outgoingData = await getOutgoingRequests();

      setIncoming(incomingData);
      setOutgoing(outgoingData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <h1>Connection Requests</h1>

      <h2>Incoming</h2>

      {incoming.length === 0 ? (
        <p>No incoming requests</p>
      ) : (
        incoming.map((request) => (
          <div key={request.id}>
            <h3>{request.sender_name}</h3>

            <p>{request.destination}</p>

            <p>{request.status}</p>
          </div>
        ))
      )}

      <hr />

      <h2>Outgoing</h2>

      {outgoing.length === 0 ? (
        <p>No outgoing requests</p>
      ) : (
        outgoing.map((request) => (
          <div key={request.id}>
            <h3>{request.receiver_name}</h3>

            <p>{request.destination}</p>

            <p>{request.status}</p>
          </div>
        ))
      )}

    </div>
  );
};

export default Requests;