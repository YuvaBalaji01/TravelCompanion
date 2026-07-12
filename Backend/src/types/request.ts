export interface SendConnectionRequest {
    tripId: number;
    receiverId: number;
}

export interface IncomingRequest {
  id: number;

  trip_id: number;

  sender_id: number;
  sender_name: string;
  sender_email: string;
  bio: string | null;

  destination: string;
  start_date: string;
  end_date: string;

  status: "PENDING" | "ACCEPTED" | "REJECTED";

  created_at: string;
}

export interface OutgoingRequest {
  id: number;

  trip_id: number;

  receiver_id: number;
  receiver_name: string;
  receiver_email: string;
  bio: string | null;

  destination: string;
  start_date: string;
  end_date: string;

  status: "PENDING" | "ACCEPTED" | "REJECTED";

  created_at: string;
}