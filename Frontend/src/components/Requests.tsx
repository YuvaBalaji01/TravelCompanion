import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getIncomingRequests,
  getOutgoingRequests,
  acceptRequest,
  rejectRequest,
} from "../services/requestService";

import type {
  IncomingRequest,
  OutgoingRequest,
} from "../types/request";

type ActiveTab = "incoming" | "outgoing";

const Requests = (): React.JSX.Element => {
  const navigate = useNavigate();

  const [incoming, setIncoming] = useState<IncomingRequest[]>([]);
  const [outgoing, setOutgoing] = useState<OutgoingRequest[]>([]);
  const [activeTab, setActiveTab] =
    useState<ActiveTab>("incoming");

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

  const getStatusColor = (
    status: string
  ): string => {
    switch (status) {
      case "ACCEPTED":
        return "#16a34a";

      case "REJECTED":
        return "#dc2626";

      default:
        return "#eab308";
    }
  };


  const handleWithdraw = async (
    requestId: number
  ): Promise<void> => {
    console.log("Withdraw", requestId);

    // TODO
  };

  //Request

  const handleAccept = async (id: number) => {
    await acceptRequest(id);
    await loadRequests();
  };

  const handleReject = async (id: number) => {
    await rejectRequest(id);
    await loadRequests();
  };

  return (
    <div className="results-root">

      <div className="results-header">
        <h1>Your Connections</h1>

        <button
          onClick={() => navigate("/dashboard")}
        >
          X
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <button
          className="connect-btn"
          onClick={() =>
            setActiveTab("incoming")
          }
        >
          Received ({incoming.length})
        </button>

        <button
          className="connect-btn"
          onClick={() =>
            setActiveTab("outgoing")
          }
        >
          Sent ({outgoing.length})
        </button>
      </div>

      {activeTab === "incoming" ? (

        incoming.length === 0 ? (

          <div className="no-results">
            <h3>No incoming requests</h3>
          </div>

        ) : (

          <div className="results-grid">

            {incoming.map((request) => (

              <div
                className="result-card"
                key={request.id}
              >

                <div className="avatar">
                  {request.sender_name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <h2>{request.sender_name}</h2>

                <p className="bio">
                  {request.bio ??
                    "No bio available"}
                </p>

                <div className="info-box">

                  <p>
                    <strong>Email:</strong>{" "}
                    {request.sender_email}
                  </p>

                  <p>
                    <strong>
                      Destination:
                    </strong>{" "}
                    {request.destination}
                  </p>

                  <p>
                    <strong>
                      Travel Dates:
                    </strong>
                  </p>

                  <p>
                    {request.start_date}
                    {" → "}
                    {request.end_date}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        color: getStatusColor(
                          request.status
                        ),
                        fontWeight: 700,
                      }}
                    >
                      {request.status}
                    </span>
                  </p>

                </div>

                {request.status ===
                  "PENDING" ? (

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >

                    <button
                      className="connect-btn"
                      onClick={() => handleAccept(request.id)}
                    >
                      Accept
                    </button>

                    <button
                      className="connect-btn"
                      onClick={() => handleReject(request.id)}
                    >
                      Reject
                    </button>

                  </div>

                ) : (

                  <button
                    className="connect-btn"
                    disabled
                  >
                    {request.status}
                  </button>

                )}

              </div>

            ))}

          </div>

        )

      ) : (

        outgoing.length === 0 ? (

          <div className="no-results">
            <h3>No outgoing requests</h3>
          </div>

        ) : (

          <div className="results-grid">

            {outgoing.map((request) => (

              <div
                className="result-card"
                key={request.id}
              >

                <div className="avatar">
                  {request.receiver_name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <h2>
                  {request.receiver_name}
                </h2>

                <p className="bio">
                  {request.bio ??
                    "No bio available"}
                </p>

                <div className="info-box">

                  <p>
                    <strong>Email:</strong>{" "}
                    {request.receiver_email}
                  </p>

                  <p>
                    <strong>
                      Destination:
                    </strong>{" "}
                    {request.destination}
                  </p>

                  <p>
                    <strong>
                      Travel Dates:
                    </strong>
                  </p>

                  <p>
                    {request.start_date}
                    {" → "}
                    {request.end_date}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        color: getStatusColor(
                          request.status
                        ),
                        fontWeight: 700,
                      }}
                    >
                      {request.status}
                    </span>
                  </p>

                </div>

                {request.status ===
                  "PENDING" ? (

                  <button
                    className="connect-btn"
                    onClick={() =>
                      handleWithdraw(
                        request.id
                      )
                    }
                  >
                    Withdraw
                  </button>

                ) : (

                  <button
                    className="connect-btn"
                    disabled
                  >
                    {request.status}
                  </button>

                )}

              </div>

            ))}

          </div>

        )

      )}

    </div>
  );
};

export default Requests;